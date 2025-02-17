// create-product.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDecimal } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string | undefined;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  price?: string;

  @IsString()
  @IsNotEmpty()
  qunatity: string | undefined;

  @IsNumber()
  shopID: number | undefined;

  @IsNumber()
  categoryID: number | undefined;

  @IsNumber()
  subCategoryID: number | undefined;

  @IsString()
  imageId: string | undefined;

  @IsNumber()
  sizeID: number | undefined;
}
