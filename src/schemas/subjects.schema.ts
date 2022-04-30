import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as pagination from 'mongoose-paginate-v2';
import { deleteArtifacts } from 'src/utils/transform';

export type SubjectDocument = Subject & mongoose.Document;

@Schema()
export class Subject {
  @Prop({ required: true })
  name: string;
}

const SubjectSchema = SchemaFactory.createForClass(Subject);

SubjectSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => deleteArtifacts('subjectId', doc, ret),
});

SubjectSchema.plugin(pagination);

export { SubjectSchema };
