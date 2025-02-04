import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export class TokenService {
  private secretKey: string;

  constructor() {
    this.secretKey = "fjffhkjkjoykyymmgmfjeenfnsjhaxhi";
    console.log('Secret Key:', this.secretKey);
  }

  generateToken(payload: { userId: number, role: string, username: string, email: string }) {
    console.log('Generating token for payload:', payload);
    const accessToken = jwt.sign(payload, this.secretKey, { expiresIn: '3hours' });
    console.log('Access Token:', accessToken);
    const refreshToken = jwt.sign(payload, this.secretKey, { expiresIn: '7d' });
    console.log('Refresh Token:', refreshToken);
    return { accessToken, refreshToken };
  }
}