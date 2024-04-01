import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Report {
  @Prop({ required: true })
  hospitalName: string;

  @Prop({ required: true })
  doctorName: string;

  @Prop({ required: true })
  disease: String;

  @Prop({ required: true })
  prescription: String;

  @Prop({ required: false, default: Date.now, type: Date })
  date: Date;

  @Prop({ required: true })
  images: string[];
}

export const ReportSchema = SchemaFactory.createForClass(Report);
