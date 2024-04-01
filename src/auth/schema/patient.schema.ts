import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Report } from 'src/doctor/schemas/report.schema';

@Schema({
  timestamps: true,
})
export class Patient extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true, type: Number })
  phone: number;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report',
  })
  reports: Report[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
