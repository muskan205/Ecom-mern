//generating the jwt token

import jwt from "jsonwebtoken";

export class TokenService {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  generateToken(payload: { userId: number, role: string ,username:string,email:string}) {
    const accessToken = jwt.sign(payload, this.secretKey, { expiresIn: '3hours' });
    const refreshToken = jwt.sign(payload, this.secretKey, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }
}
