import { Subject } from './subjects.schema';
import { User } from './users.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { deleteArtifacts } from 'src/utils/transform';

export type LessonDocument = Lesson & Document;

@Schema()
export class Lesson {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  })
  subject: Subject;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Bell', required: true })
  bell: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  teacher: User;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  weekDay: number;
}

const LessonSchema = SchemaFactory.createForClass(Lesson);

LessonSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => deleteArtifacts('lessonId', doc, ret),
});

export { LessonSchema };
