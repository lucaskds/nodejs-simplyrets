import { IsString, IsInt, IsOptional, Min, Max } from 'class-validator';

export class FilterDTO {
  @IsString()
  @IsOptional()
  address?: string;

  @IsInt()
  @IsOptional()
  minPrice?: number;

  @IsInt()
  @IsOptional()
  maxPrice?: number;

  @IsInt()
  @IsOptional()
  minBedrooms?: number;

  @IsInt()
  @IsOptional()
  maxBedrooms?: number;

  @IsInt()
  @IsOptional()
  minBathrooms?: number;

  @IsInt()
  @IsOptional()
  maxBathrooms?: number;

  @IsString()
  @IsOptional()
  type?: string;

  @IsInt()
  offset: number;

  @IsInt()
  limit: number;
}
