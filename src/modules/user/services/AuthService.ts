import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
const { AppDataSource } = require("../../../infra/db/data-source");
import {
  RegisterUserDto,
  LoginUserDto,
  ForgetPasswordDto,
  VerifyOtpDto,
} from "../dto/User.dto";
import { TokenService } from "../../../infra/utils/TokenUtil";
import { MailService } from "../../../infra/utils/sendMail";
import { Account } from "../../../entity/Account.entity";
import { test_Seller } from "../../../entity/test-seller";
import { test_User } from "../../../entity/test-user";
import { PaginationOptions } from "../../../dto/pagination.interface";
import { paginate } from "../../../infra/utils/pagination";

export class AuthService {
  private accountRepository = AppDataSource.getRepository(Account);
  private testSellerRepo = AppDataSource.getRepository(test_Seller);
  private testUserRepo = AppDataSource.getRepository(test_User);

  //making the token sevrice class object
  private tokenService: TokenService;

  constructor() {
    this.tokenService = new TokenService();
  }

  async registration(
    registerDto: RegisterUserDto,
    req: Request,
    res: Response
  ): Promise<any> {
    const { email, password, role = "user", username, shopName } = req.body;

    try {
      const existingAccount = await this.accountRepository.findOneBy({ email });
      if (existingAccount) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const account = new Account();
      account.email = email;
      account.password = hashedPassword;
      account.role = role;

      await this.accountRepository.save(account); // Save the account entity first

      if (role === "seller") {
        const seller = new test_Seller();
        seller.username = username;
        seller.shopName = shopName;
        seller.accountId = account.id; // Set the account ID
        await this.testSellerRepo.save(seller);
        account.seller = seller; // Save the seller entity to the account
      } else {
        const user = new test_User();
        user.username = username;
        user.accountId = account.id; // Set the account ID
        await this.testUserRepo.save(user);
        account.user = user; // Save the user entity to the account
      }

      await this.accountRepository.save(account); // Save the updated account entity

      return account;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async login(loginDto: LoginUserDto, req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const account = await this.accountRepository.findOne({
        where: { email },
        relations: ["seller", "user"], //defining relation
      });
      console.log("account");
      if (!account) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isValidPassword = await bcrypt.compare(password, account.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      let user;
      // if (account.role === "user") {
      //   user = account.user;
      // }
      if (account.role === "seller") {
        user = account.seller;
      } else {
        user = account.user;
      }
      const { accessToken, refreshToken } = this.tokenService.generateToken({
        userId: user.id,
        username: user.username,
        role: account.role,
        email: account.email,
      });
      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000, // 1 hour
      });
      console.log("cookieToke", accessToken);
      res.setHeader("Authorization", `Bearer ${accessToken}`);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      return res.status(200).json({ account, user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async forgetPassword(
    forgetPasswordDto: ForgetPasswordDto,
    req: Request,
    res: Response
  ): Promise<any> {
    const mailService = new MailService();
    const { email } = forgetPasswordDto;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user exists
    const user = await this.accountRepository.findOneBy({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const now = new Date();
    // Check if the last OTP was sent within the last minute
    if (
      user.lastOtpSentAt &&
      now.getTime() - user.lastOtpSentAt.getTime() < 60 * 1000
    ) {
      // const now = new Date();
      const timeDiff = now.getTime() - user.lastOtpSentAt.getTime();
      const minutes = Math.floor(timeDiff / (60 * 1000));
      const seconds = Math.floor((timeDiff % (60 * 1000)) / 1000);
      return res.status(429).json({
        message: `You can request a new OTP in ${minutes} minutes and ${seconds} seconds.`,
      });
    }

    // Generate a new OTP and set its expiration time
    const otp = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP
    const otpExpires = new Date();
    otpExpires.setMinutes(otpExpires.getMinutes() + 5);

    // Send OTP to the user's email
    const emailText = `Your password reset OTP is: ${otp}\nIt will expire in 5 minutes.`;
    await mailService.sendMail(user.email, "Password Reset OTP", emailText);

    const { accessToken, refreshToken } = this.tokenService.generateToken({
      userId: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    });

    user.otp = otp.toString();
    user.otpExpires = otpExpires.toISOString();
    console.log("*********expires", otpExpires);
    user.lastOtpSentAt = now;
    await this.accountRepository.save(user);
    res.setHeader("Authorization", `Bearer ${accessToken}`);
    // Send success response
    return res.status(200).json({
      message: "OTP sent successfully. It will expire in 5 minutes.",
      accessToken,
      refreshToken,
      user,
    });
  }

  async verifyOtp(
    verifyOtpDto: VerifyOtpDto,
    req: Request,
    res: Response
  ): Promise<any> {
    const { otp } = req.body;
    console.log(req.body);

    const userOtp = await this.accountRepository.findOne({ where: { otp } });

    if (!userOtp) {
      return res.status(404).json({ message: "Invalid OTP." });
    }

    const now = new Date();
    const ExpirationTime = userOtp.otpExpires.getTime();
    if (ExpirationTime < now.getTime()) {
      return res
        .status(410)
        .json({ message: "OTP has expired. Please request a new one." });
    }

    return res.status(200).json({ message: "OTP is valid.", ExpirationTime });
  }

  async getUsers(req: any, res: any): Promise<any> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 2;

      const paginationOptions: PaginationOptions = {
        page,
        limit,
        repository: await this.accountRepository,
      };

      const {
        data: users1,
        total,
        totalPages,
      } = await paginate(paginationOptions);

      res.status(200).json(users1, page, totalPages, total);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching users" });
    }
  }

  async getUserByID(id: string, req: Request, res: Response): Promise<any> {
    const user = await this.accountRepository.findOneBy({ id });
    console.log("user-by-id", user);
    if (user) {
      res
        .status(201)
        .json({ message: `Got the user with this id ${id}`, user });
    }

    res.status(200).json({ message: "User not found" });
  }

  async resetPassword(req: Request, res: Response): Promise<any> {
    const { id, password, confirmPassword } = req.body;
    if (password != confirmPassword) {
      res.status(400).json({ message: "Password do not match" });
    }
    try {
      const user = await this.accountRepository.findOneBy({ id });
      console.log("********user*****", user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.password = await bcrypt.hash(password, 10);
      await this.accountRepository.save(user);

      return res.status(200).json({
        message: "Password reset successfully",

        user,
      });
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}
