import { ApiProperty } from '@nestjs/swagger';

export class ReportDto {
  @ApiProperty()
  hospitalName: string;
  @ApiProperty()
  doctorName: string;
  @ApiProperty()
  disease: string;
  @ApiProperty()
  prescription: string;
  @ApiProperty()
  images: string[];
}
