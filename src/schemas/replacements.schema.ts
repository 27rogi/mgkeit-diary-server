import { Schedule } from './schedules.schema';
import { Lesson } from './lessons.schema';
import { User } from './users.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { deleteArtifacts } from 'src/utils/transform';

export type ReplacementDocument = Replacement & Document;

@Schema()
export class Replacement {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true })
  lesson: Lesson;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
    required: true,
  })
  schedule: Schedule;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  teacher: User;

  @Prop({ required: true })
  location: string;
}

const ReplacementSchema = SchemaFactory.createForClass(Replacement);

ReplacementSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => deleteArtifacts('replacementId', doc, ret),
});

export { ReplacementSchema };
