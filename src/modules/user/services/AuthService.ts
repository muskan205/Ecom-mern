import { Request, Response } from "express";
const { AppDataSource } = require("../../../infra/db/data-source");
import { User } from "../../../entity/User";
import {
  RegisterUserDto,
  LoginUserDto,
  ForgetPasswordDto,
  VerifyOtpDto,
} from "../dto/User.dto";
import {
  hashPassword,
  comparePasswords,
} from "../../../infra/utils/hash.utils";
import jwt from "jsonwebtoken";
import { TokenService } from "../../../infra/utils/TokenUtil";
import { MailService } from "../../../infra/utils/sendMail";
import { Seller } from "../../../entity/Seller";
// import { decode } from "punycode"
import * as bcrypt from "bcrypt";
const dotenv = require("dotenv");
dotenv.config();

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);
  private sellerRepository = AppDataSource.getRepository(Seller);
  //making the token sevrice class object
  private tokenService = new TokenService(
    process.env.Secret_Key || "dhjksafuirewxsmk"
  );
  async register(
    registerDto: RegisterUserDto,
    req: Request,
    res: Response
  ): Promise<any> {
    const {
      username,
      email,
      password,
      role = "user",
      shopName,
      sellerId,
    } = registerDto;

    if (role === "seller") {
      const hashedPassword = await hashPassword(password);
      const seller = this.sellerRepository.create({
        role,
        username,
        shopName,
        email,
        password: hashedPassword,
      });

      await this.sellerRepository.save(seller);
      res.status(200).json("seller created sucessfully");

      const { accessToken, refreshToken } = this.tokenService.generateToken({
        userId: seller.id,
        role: role,
        username: seller.username,
        email: seller.email,
      });

      await this.userRepository.save(seller);

      res.setHeader("Authorization", `Bearer ${accessToken}`);
      res.setHeader("X-Refresh-Token", refreshToken);
      res.status(201).json(seller);
    }
    if (role === "user") {
      const hashedPassword = await hashPassword(password);
      const user = this.userRepository.create({
        username,
        email,
        password: hashedPassword,
        role,
        sellerId,
      });

      await this.userRepository.save(user);

      const { accessToken, refreshToken } = this.tokenService.generateToken({
        userId: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      });

      user.passwordResetToken = null;
      user.passwordResetExpires = null;

      user.passwordResetToken = accessToken;
      user.passwordResetExpires = new Date(Date.now() + 3600000);

      await this.userRepository.save(user);

      res.setHeader("Authorization", `Bearer ${accessToken}`);
      res.setHeader("X-Refresh-Token", refreshToken);
      res.status(201).json(user);
    } else if (role === "admin") {
      const hashedPassword = await hashPassword(password);
      const user = this.userRepository.create({
        username,
        email,
        password: hashedPassword,
        role,
        sellerId,
      });

      await this.userRepository.save(user);

      const { accessToken, refreshToken } = this.tokenService.generateToken({
        userId: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      });

      user.passwordResetToken = null;
      user.passwordResetExpires = null;

      user.passwordResetToken = accessToken;
      user.passwordResetExpires = new Date(Date.now() + 3600000);

      await this.userRepository.save(user);

      res.setHeader("Authorization", `Bearer ${accessToken}`);
      res.setHeader("X-Refresh-Token", refreshToken);
      res.status(201).json(user);
    }
  }

  async login(
    loginDto: LoginUserDto,
    req: Request,
    res: Response
  ): Promise<any> {
    const { email, password } = loginDto;

    try {
      console.log("Logging in user:", email);

      if (!email || !password) {
        throw new Error("Please fill in all details");
      }

      const user = await this.userRepository.findOneBy({
        email: email.toLowerCase(),
      });
      console.log("User found:", user);

      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordMatch = await comparePasswords(password, user.password);
      console.log("Password match:", isPasswordMatch);

      if (!isPasswordMatch) {
        throw new Error("Invalid credentials");
      }

      const { accessToken, refreshToken } = this.tokenService.generateToken({
        userId: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      });
      console.log("Token generated:", accessToken, refreshToken);

      res.setHeader("Authorization", `Bearer ${accessToken}`);
      res.setHeader("X-Refresh-Token", refreshToken);
      res.status(200);
      res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(400);
    }
  }
  async sellerLogin(
    loginDto: LoginUserDto,
    req: Request,
    res: Response
  ): Promise<any> {
    const { email, password } = loginDto;

    try {
      if (!email || !password) {
        throw new Error("Please provide both email and password.");
      }

      // Fetch seller data
      const seller = await this.sellerRepository.findOneBy({
        email: email.toLowerCase(),
      });

      if (!seller) {
        throw new Error("Seller not found.");
      }

      // Verify password
      const isPasswordMatch = await comparePasswords(password, seller.password);
      if (!isPasswordMatch) {
        throw new Error("Invalid credentials.");
      }

      // Generate tokens
      const { accessToken, refreshToken } = this.tokenService.generateToken({
        userId: seller.id,
        username: seller.username,
        role: seller.role,
        email: seller.email,
      });

      // Set response headers for tokens
      res.setHeader("Authorization", `Bearer ${accessToken}`);
      res.setHeader("X-Refresh-Token", refreshToken);

      // Send success response
      return res.status(200).json({
        message: "Login successful",
        seller: {
          id: seller.id,
          username: seller.username,
          email: seller.email,
          role: seller.role,
          shopName: seller.shopName,
          selllerId: seller.id,
        },
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      console.error("Seller login error:", error);
      return res.status(400).json({ message: error.message });
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
    const user = await this.userRepository.findOneBy({ email });
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
    await this.userRepository.save(user);
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

    const userOtp = await this.userRepository.findOne({ where: { otp } });

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

  async getUsers(req: Request, res: Response): Promise<any> {
    const user = await this.userRepository.find();

    if (user) {
      res.status(201).json({ message: "users fetched successfully", user });
    }

    res.status(200).json({ message: "Users not exists" });
  }

  async resetPassword(req: Request, res: Response): Promise<any> {
    const { id, password, confirmPassword } = req.body;
    if (password != confirmPassword) {
      res.status(400).json({ message: "Password do not match" });
    }
    try {
      const user = await this.userRepository.findOneBy({ id });
      console.log("********user*****", user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.password = await bcrypt.hash(password, 10);
      await this.userRepository.save(user);

      return res.status(200).json({
        message: "Password reset successfully",

        user,
      });
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  async getUserByID(id:string,req: Request, res: Response): Promise<any> {
  
    const user = await this.userRepository.findOneBy({id });
    console.log("user-by-id", user);
    if (user) {
      res
        .status(201)
        .json({ message: `Got the user with this id ${id}`, user });
    }

    res.status(200).json({ message: "User not found" });
  }
}
