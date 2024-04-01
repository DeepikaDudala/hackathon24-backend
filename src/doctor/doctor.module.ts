import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Doctor, DoctorSchema } from 'src/hospital/schemas/doctor.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HospitalModule } from 'src/hospital/hospital.module';
import { Hospital, HospitalSchema } from 'src/auth/schema/hospital.schema';
import { Patient, PatientSchema } from 'src/auth/schema/patient.schema';
import { Report, ReportSchema } from './schemas/report.schema';

@Module({
  imports: [
    HospitalModule,
    MongooseModule.forFeature([
      { name: Doctor.name, schema: DoctorSchema },
      { name: Hospital.name, schema: HospitalSchema },
      { name: Patient.name, schema: PatientSchema },
      { name: Report.name, schema: ReportSchema },
    ]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
