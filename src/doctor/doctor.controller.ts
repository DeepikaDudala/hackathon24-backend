import { Body, Controller, Get, Query } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Param } from '@nestjs/common';
import { ReportDto } from './dto/report.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('doctor')
@ApiBearerAuth()
@ApiTags('Doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}
  @Get('getDoctorAppiontments/:doctorId')
  @ApiResponse({ status: 200, description: 'Get doctor with appiontments' })
  getDoctorWithAppiontments(@Param('doctorId') doctorId: string) {
    return this.doctorService.getDoctorWithAppiontments(doctorId);
  }

  @Get('getReports/:patientId')
  @ApiResponse({ status: 200, description: 'Get reports' })
  getReports(@Param('patientId') patientId: string) {
    return this.doctorService.getReports(patientId);
  }

  @Get('updateReports/:patientId')
  @ApiResponse({ status: 200, description: 'Update reports' })
  updateReports(
    @Param('patientId') patientId: string,
    @Body('request') request: ReportDto,
  ) {
    return this.doctorService.updateReports(patientId, request);
  }
}
