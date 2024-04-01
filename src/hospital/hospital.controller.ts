import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { CreateDoctorDto } from './dto/hospital.dto';
import { Hospital } from 'src/auth/schema/hospital.schema';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
@Controller('hospital')
@ApiBearerAuth()
@ApiTags('Hospital')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}
  @Get('allHospitals')
  @ApiResponse({ status: 200, description: 'Get all hospitals' })
  getAllHospitals(): Promise<Hospital[]> {
    return this.hospitalService.getAllHospitals();
  }
  @Get('getHospital/:hospitalId')
  @ApiResponse({ status: 200, description: 'Get hospital by id' })
  getHospital(@Param('hospitalId') id: string) {
    return this.hospitalService.getHospitalById(id);
  }

  @Get('getHospital/:hospitalName')
  @ApiResponse({ status: 200, description: 'Get hospital by name' })
  getHospitalByName(@Param('hospitalName') name: string) {
    return this.hospitalService.getHospitalByName(name);
  }
  @Post('addDoctor')
  @ApiResponse({ status: 201, description: 'doctor added successfully' })
  addDoctor(
    @Body() createDoctorDto: CreateDoctorDto,
    @Query('hospitalId') hospitalId: string,
  ) {
    return this.hospitalService.addDoctor(createDoctorDto, hospitalId);
  }
  @Post('removeDoctor')
  @ApiResponse({ status: 200, description: 'doctor removed successfully' })
  removeDoctor(
    @Query('doctorId') doctorId: string,
    @Query('hospitalId') hospitalId: string,
  ) {
    return this.hospitalService.removeDoctor(doctorId, hospitalId);
  }

  @Get(':hospitalId/getAllDoctors')
  @ApiResponse({ status: 200, description: 'Get all doctors' })
  getAllDoctors(@Param('hospitalId') hospitalId: string) {
    return this.hospitalService.getAllDoctors(hospitalId);
  }

  @Get('getDoctor/:doctorId')
  @ApiResponse({ status: 200, description: 'Get doctor by id' })
  getDoctor(@Param('doctorId') doctorId: string) {
    return this.hospitalService.getDoctor(doctorId);
  }
}
