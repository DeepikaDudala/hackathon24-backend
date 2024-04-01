import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class PatientSignUpDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'name must be a string' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String, description: 'email must be a email' })
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('IN')
  @MinLength(10)
  @MaxLength(10)
  @ApiProperty({ type: Number, description: 'phone must be a phone number' })
  phone: number;

  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({
    type: String,
    description: 'password must be greater than 5 letters',
  })
  password: string;
}
export class HospitalSignUpDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'name must be a string' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'hospitalId must be a string' })
  hospitalId: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String, description: 'email must be a email' })
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('IN')
  @MinLength(10)
  @MaxLength(10)
  @ApiProperty({ type: Number, description: 'phone must be a phone number' })
  phone: number;

  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({
    type: String,
    description: 'password must be greater than 5 letters',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  country: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  state: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  city: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(6)
  @ApiProperty({ type: Number, default: 534101 })
  pincode: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  street: string;
}
