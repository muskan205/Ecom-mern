import { IsOptional, IsString, IsEmail, IsEnum } from "class-validator";

export class UpdateSellerDto {
  @IsString()
  id?: string;
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  shopName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(["admin", "seller", "user"])
  role?: "admin" | "seller" | "user";
}



export class GetSellerDto {
  @IsString()
  id?: string;

}
