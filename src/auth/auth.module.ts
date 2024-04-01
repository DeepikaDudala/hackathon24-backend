import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './schema/patient.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { Hospital, HospitalSchema } from './schema/hospital.schema';
import { Address, AddressSchema } from './schema/address.schema';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Doctor, DoctorSchema } from 'src/hospital/schemas/doctor.schema';
import {
  Appointment,
  AppointmentSchema,
} from 'src/patient/schemas/appointment.schema';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES,
        },
      }),
    }),
    MongooseModule.forFeature([
      { name: Patient.name, schema: PatientSchema },
      { name: Hospital.name, schema: HospitalSchema },
      { name: Address.name, schema: AddressSchema },
      { name: Doctor.name, schema: DoctorSchema },
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
