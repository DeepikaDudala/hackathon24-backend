import { Module } from '@nestjs/common';
import { HospitalController } from './hospital.controller';
import { HospitalService } from './hospital.service';
import { Doctor, DoctorSchema } from './schemas/doctor.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Hospital, HospitalSchema } from 'src/auth/schema/hospital.schema';
import {
  Appointment,
  AppointmentSchema,
} from 'src/patient/schemas/appointment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hospital.name, schema: HospitalSchema },
      { name: Doctor.name, schema: DoctorSchema },
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
  ],
  controllers: [HospitalController],
  providers: [HospitalService],
})
export class HospitalModule {}
