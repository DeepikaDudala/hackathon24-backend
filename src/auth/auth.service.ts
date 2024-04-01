import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from './schema/patient.schema';
import { Model } from 'mongoose';
import { HospitalSignUpDto, PatientSignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { HospitalLoginDto, PatientLoginDto } from './dto/login.dto';
import { Hospital } from './schema/hospital.schema';
import { Address } from './schema/address.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Patient.name) private PatientModel: Model<Patient>,
    @InjectModel(Hospital.name) private HospitalModel: Model<Hospital>,
    @InjectModel(Address.name) private AddressModel: Model<Address>,
    private jwtService: JwtService,
  ) {}

  async patientSignUp(
    signUpDto: PatientSignUpDto,
  ): Promise<{ token: string; user }> {
    const { password, ...details } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await this.PatientModel.create({
        ...details,
        password: hashedPassword,
      });
      const token = this.jwtService.sign({ id: user._id });

      return { token, user };
    } catch (error) {
      if (error?.code === 11000) {
        throw new ConflictException(`User alredy Exists`);
      }
    }
  }

  async patientLogin(
    loginDto: PatientLoginDto,
  ): Promise<{ token: string; user }> {
    const { email, password } = loginDto;
    const user = await this.PatientModel.findOne({ email });

    if (!user) throw new UnauthorizedException(`User not Exists`);

    const isPasswordMatched = bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException(`Password doesn't match`);
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token, user };
  }
  async hospitalSignUp(
    signUpDto: HospitalSignUpDto,
  ): Promise<{ token: string; hospital }> {
    console.log(signUpDto);
    const { password, ...details } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const address = await this.AddressModel.create({
        country: details.country,
        state: details.state,
        city: details.city,
        street: details.street,
        pincode: details.pincode,
      });
      const hospital = await this.HospitalModel.create({
        ...details,
        password: hashedPassword,
        address: address._id,
      });
      const token = this.jwtService.sign({ id: hospital._id });
      return { token, hospital };
    } catch (error) {
      if (error?.code === 11000) {
        throw new ConflictException(`User alredy Exists`);
      } else {
        console.log(error);
      }
    }
  }

  async hospitalLogin(
    loginDto: HospitalLoginDto,
  ): Promise<{ token: string; hospital }> {
    const { hospitalId, password } = loginDto;
    const hospital = await this.HospitalModel.findOne({ hospitalId });

    if (!hospital) throw new UnauthorizedException(`hospital not Exists`);

    const isPasswordMatched = bcrypt.compare(password, hospital.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException(`Password doesn't match`);
    }

    const token = this.jwtService.sign({ id: hospital._id });

    return { token, hospital };
  }

  async doctorLogin() {
    
  }
}
