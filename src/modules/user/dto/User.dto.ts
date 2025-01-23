import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";

///
export class RegisterUserDto {
  @IsString()
  username: string | undefined;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsString()
  role?: "admin" | "seller" | "user";

  @IsString()
  sellerId?: string | undefined;
  @IsString()
  shopName?: string | undefined;

}

export class LoginUserDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;
}

export class ForgetPasswordDto {
  @IsEmail()
  email!: string;
}

export class VerifyOtpDto{
  @IsNotEmpty()
  otp!:string
}
