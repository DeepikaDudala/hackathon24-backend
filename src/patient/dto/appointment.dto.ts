import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @ApiProperty()
  timeSlot: string;

  @ApiProperty()
  @IsNotEmpty()
  healthIssue: string;
}
