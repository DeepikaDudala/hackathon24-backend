import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class PatientLoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String })
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ type: String })
  password: string;
}

export class HospitalLoginDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  hospitalId: string;

  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ type: String })
  password: string;
}
