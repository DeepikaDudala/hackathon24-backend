import { Injectable } from '@nestjs/common';
import { Doctor } from './schemas/doctor.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hospital } from 'src/auth/schema/hospital.schema';
import { CreateDoctorDto } from './dto/hospital.dto';

@Injectable()
export class HospitalService {
  constructor(
    @InjectModel(Hospital.name) private HospitalModel: Model<Hospital>,
    @InjectModel(Doctor.name) private DoctorModel: Model<Doctor>,
  ) {}
  async getAllHospitals(): Promise<Hospital[]> {
    const hospitals: Hospital[] =
      await this.HospitalModel.find().populate('address');
    
    
    return hospitals;
  }
  async getHospitalById(id: string): Promise<Hospital> {
    const hospital: Hospital = await this.HospitalModel.findById(id);
    return hospital;
  }
  async getHospitalByName(name: string): Promise<Hospital[]> {
    const keyword = name
      ? {
          name: {
            $regex: name,
            $options: 'i',
          },
        }
      : {};
    const hospital = await this.HospitalModel.find(keyword);
    return hospital;
  }
  async addDoctor(
    createDoctorDto: CreateDoctorDto,
    hospitalId: string,
  ): Promise<any> {
    let hospital = await this.HospitalModel.findById(hospitalId);
    let doctor = await this.DoctorModel.findOne({
      phone: createDoctorDto.phone,
    });
    if (!doctor) {
      doctor = await this.DoctorModel.create(createDoctorDto);
    }
    if (!hospital.doctors) {
      hospital = await this.HospitalModel.findByIdAndUpdate(
        hospitalId,
        { $set: { doctors: [doctor._id.toString()] } },
        { new: true },
      );
      console.log(hospital);
    } else {
      hospital = await this.HospitalModel.findByIdAndUpdate(
        hospitalId,
        { $push: { doctors: doctor._id.toString() } },
        { new: true },
      );
    }
    return { data: hospital, message: 'Doctor added successfully' };
  }

  async removeDoctor(doctorId: string, hospitalId: string): Promise<any> {
    const hospital = await this.HospitalModel.findById(hospitalId);
    hospital.doctors = hospital.doctors.filter(
      (doctor) => doctor._id.toString() !== doctorId,
    );
    await hospital.save();
    return { data: hospital, message: 'Doctor removed successfully' };
  }

  async getAllDoctors(hospitalId: string): Promise<any> {
    const doctors =
      await this.HospitalModel.findById(hospitalId).populate('doctors');
    const simplifiedDoctors = doctors.doctors.map((doctor) => ({
      name: doctor.name,
      experience: doctor.experience,
      specialization: doctor.specialization,
      photo: doctor.photo,
    }));

    return simplifiedDoctors;
  }

  async getDoctor(doctorId: string): Promise<Doctor> {
    const doctor = await this.DoctorModel.findById(doctorId);
    return doctor;
  }
}
