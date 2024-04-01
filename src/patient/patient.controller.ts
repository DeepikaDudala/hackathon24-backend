import { Controller, Param, Post } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreateAppointmentDto } from './dto/appointment.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('patient')
@ApiBearerAuth()
@ApiTags('Patient')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Post(':patientId/addAppointment/:doctorId')
  @ApiResponse({ status: 201, description: 'appointment added successfully' })
  addAppointment(
    @Param('patientId') patientId: string,
    @Param('doctorId') doctorId: string,
    request: CreateAppointmentDto,
  ) {
    return this.patientService.addAppointment(patientId, doctorId, request);
  }
}
