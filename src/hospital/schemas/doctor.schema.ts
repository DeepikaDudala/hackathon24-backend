import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
const timeSlots = {
  '9:00 AM': false,
  '10:00 AM': false,
  '11:00 AM': false,
  '1:00 PM': false,
  '2:00 PM': false,
  '3:00 PM': false,
  '4:00 PM': false,
  '5:00 PM': false,
};
@Schema()
export class Doctor extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  specialization: string;

  @Prop({ required: true })
  experience: number;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  photo: string;

  @Prop({ required: false, default: timeSlots })
  appointment: [{ [key: string]: boolean | Object }];
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
