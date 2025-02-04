import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import {
  RegisterUserDto,
  LoginUserDto,
  ForgetPasswordDto,
  VerifyOtpDto,
} from "../dto/User.dto";

const authService = new AuthService();

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const forgetPasswordDto: ForgetPasswordDto = req.body;
    const user = await authService.forgetPassword(forgetPasswordDto, req, res);
    res.status(201).json({
      message: "OTP sent successfully. It will expire in 5 minutes",
      user,
    });
  } catch (error: any) {
    res.status(400).json({ error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await authService.getUsers(req, res);
    // res.status(201).json({ message: "Forget password link", user });
  } catch (error: any) {
    res.status(400).json({ error });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const user = await authService.resetPassword(req, res);
    // res.status(201).json({ message: "Password Reset", user });
  } catch (error: any) {
    res.status(400).json({ error });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const verifyOtpDto: VerifyOtpDto = req.body;
    const user = await authService.verifyOtp(verifyOtpDto, req, res);
    // res.status(201).json({ message: "Forget password link sent", user });
  } catch (error: any) {
    res.status(400).json({ mesage: "Otp not found" });
  }
};

export const getUserByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const seller = await authService.getUserByID(id, req, res);
    res.status(200).json({ message: "Seller retrieved successfully", seller });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export const registration = async (req: Request, res: Response) => {
  try {
    const registerDto: RegisterUserDto = req.body;
    const user = await authService.registration(registerDto, req, res);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const loginDto: LoginUserDto = req.body;
    const user = await authService.login(loginDto, req, res);
    // res.status(201).json({ message: "User  successfully logged in", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
