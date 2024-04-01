import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './schemas/appointment.schema';
import { Model } from 'mongoose';
import { CreateAppointmentDto } from './dto/appointment.dto';
import { Doctor } from 'src/hospital/schemas/doctor.schema';
@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Appointment.name) private AppointmentModel: Model<Appointment>,
    @InjectModel(Doctor.name) private DoctorModel: Model<Doctor>,
  ) {}
  async addAppointment(
    patientId: string,
    doctorId: string,
    request: CreateAppointmentDto,
  ) {
    const appointment = await this.AppointmentModel.create({
      patient: patientId,
      ...request,
    });
    if (appointment) {
      const doctor = await this.DoctorModel.findById(doctorId);
      doctor.appointment[request.timeSlot] = appointment._id;
    }
    return appointment;
  }
}
