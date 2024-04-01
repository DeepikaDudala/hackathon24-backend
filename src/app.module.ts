import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Import the ConfigModule
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { HospitalModule } from './hospital/hospital.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule,
    DoctorModule,
    HospitalModule,
    PatientModule,
  ],
})
export class AppModule {}
