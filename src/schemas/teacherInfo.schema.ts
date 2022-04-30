import { User } from './users.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { deleteArtifacts } from 'src/utils/transform';

export type TeacherInfoDocument = TeacherInfo & mongoose.Document;

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

TeacherInfoSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => deleteArtifacts('teacherInfoId', doc, ret),
});

export { TeacherInfoSchema };
