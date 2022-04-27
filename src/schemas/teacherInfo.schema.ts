import { User } from './users.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TeacherInfoDocument = TeacherInfo & Document;

@Schema()
export class TeacherInfo {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  teacher: User;

  @Prop({ required: true })
  specialty: string;

  @Prop({ required: true })
  workStartDate: Date;
}

const TeacherInfoSchema = SchemaFactory.createForClass(TeacherInfo);

export { TeacherInfoSchema };
