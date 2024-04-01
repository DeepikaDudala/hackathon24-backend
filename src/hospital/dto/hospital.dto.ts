import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPhoneNumber } from 'class-validator';

export class CreateDoctorDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  specialization: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number })
  experience: number;

  @IsNotEmpty()
  @ApiProperty()
  photo: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty({ type: Number })
  phone: number;
}
