import { Subject } from './subjects.schema';
import { User } from './users.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { deleteArtifacts } from 'src/utils/transform';

export type HomeworkDocument = Homework & Document;

@Schema()
export class Homework {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  })
  subject: Subject;

  @Prop({ required: true })
  mission: string;

  @Prop({ required: true })
  material: string;

  @Prop({ required: true })
  deadline: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  teacher: User;
}

const HomeworkSchema = SchemaFactory.createForClass(Homework);

HomeworkSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => deleteArtifacts('homeworkId', doc, ret),
});

export { HomeworkSchema };
