import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient } from 'src/auth/schema/patient.schema';
import { Doctor } from 'src/hospital/schemas/doctor.schema';
import { Appointment } from 'src/patient/schemas/appointment.schema';
import { Report } from './schemas/report.schema';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private DoctorModel: Model<Doctor>,
    @InjectModel(Patient.name) private PatientModel: Model<Patient>,
    @InjectModel(Report.name) private ReportModel: Model<Report>,
  ) {}
  async getDoctorWithAppiontments(doctorId: string) {
    return await this.DoctorModel.findById(doctorId).populate('appointments');
  }

  async getReports(patientId: string) {
    const patient =
      await this.PatientModel.findById(patientId).populate('reports');

    return patient.reports;
  }

  async updateReports(patientId: string, request: any) {
    const report = await this.ReportModel.create(request);
    if (report) {
      const patient = await this.PatientModel.findByIdAndUpdate(
        patientId,
        { $push: { reports: report._id } },
        { new: true },
      );
    }
    return report;
  }
}
