import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HospitalSignUpDto, PatientSignUpDto } from './dto/signup.dto';
import { HospitalLoginDto, PatientLoginDto } from './dto/login.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('patient/signup')
  @ApiCreatedResponse({ description: 'Patient Registration' })
  @ApiConflictResponse({ description: 'Patient Already Exists' })
  async patientSignUp(
    @Body() signUpDto: PatientSignUpDto,
  ): Promise<{ token: string }> {
    return await this.authService.patientSignUp(signUpDto);
  }

  @Post('patient/login')
  @ApiOkResponse({ description: 'Patient Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid Credentials' })
  async patientLogin(
    @Body() loginDto: PatientLoginDto,
  ): Promise<{ token: string }> {
    return this.authService.patientLogin(loginDto);
  }
  @Post('hospital/signup')
  @ApiCreatedResponse({ description: 'Hospital Registration' })
  @ApiConflictResponse({ description: 'Hospital Already Exists' })
  async hospitalSignUp(
    @Body() signUpDto: HospitalSignUpDto,
  ): Promise<{ token: string }> {
    return await this.authService.hospitalSignUp(signUpDto);
  }

  @Post('hospital/login')
  @ApiOkResponse({ description: 'Hospital Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid Credentials' })
  async hospitalLogin(
    @Body() loginDto: HospitalLoginDto,
  ): Promise<{ token: string }> {
    return this.authService.hospitalLogin(loginDto);
  }
}
