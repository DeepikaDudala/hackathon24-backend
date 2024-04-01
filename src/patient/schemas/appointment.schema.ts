import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Appointment extends Document {
  @Prop({ required: true })
  timeSlot: string;

  @Prop({ required: false, default: Date.now, type: Date })
  date: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Patient',
  })
  patient: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  healthIssue: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
