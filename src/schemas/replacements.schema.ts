import { Schedule, Lesson } from './schedules.schema';
import { User } from './users.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as pagination from 'mongoose-paginate-v2';
import { deleteArtifacts } from 'src/utils/transform';
import { Subject } from './subjects.schema';

export type ReplacementDocument = Replacement & mongoose.Document;

@Schema()
export class Replacement {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
  })
  lesson: Lesson;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  })
  subject: Subject;

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

ReplacementSchema.plugin(pagination);

export { ReplacementSchema };
