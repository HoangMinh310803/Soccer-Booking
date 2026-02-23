import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreatePitchDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  pricePerHour: number;

  @IsNumber()
  type: number; // 5, 7 hoặc 11 người
}
