import { User } from './users.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as pagination from 'mongoose-paginate-v2';
import { deleteArtifacts } from 'src/utils/transform';
import { Lesson } from './schedules.schema';

export type GradeDocument = Grade & mongoose.Document;

@Schema()
export class Grade {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  student: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  teacher: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true })
  lesson: Lesson;

  @Prop({ required: true })
  reason: string;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  grade: number;
}

const GradeSchema = SchemaFactory.createForClass(Grade);

GradeSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => deleteArtifacts('gradeId', doc, ret),
});

GradeSchema.plugin(pagination);

export { GradeSchema };
