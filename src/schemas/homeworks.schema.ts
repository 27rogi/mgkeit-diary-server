import { Group } from 'src/schemas/groups.schema';
import { Subject } from './subjects.schema';
import { User } from './users.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as pagination from 'mongoose-paginate-v2';
import { deleteArtifacts } from 'src/utils/transform';

export type HomeworkDocument = Homework & mongoose.Document;

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true })
  group: Group;
}

const HomeworkSchema = SchemaFactory.createForClass(Homework);

HomeworkSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => deleteArtifacts('homeworkId', doc, ret),
});

HomeworkSchema.plugin(pagination);

export { HomeworkSchema };
