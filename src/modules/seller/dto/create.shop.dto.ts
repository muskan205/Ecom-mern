import { IsOptional, IsString } from "class-validator";

export class CreateShopDto {
  // @IsOptional()
  @IsString()
  shopName: string | undefined;

  @IsString()
  shopDescription?: undefined;

  @IsString()
  category?: undefined;

  @IsString()
  location?: string | undefined;

  @IsString()
  logo_url?: string | undefined;

  @IsString()
  status?: string | undefined;

  @IsString()
  username: string | undefined;

  @IsString()
  email: string | undefined;

  @IsString()
  sellerId: string | undefined;

  @IsString()
  categoryId: string | undefined;
}
