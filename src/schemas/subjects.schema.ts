import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { deleteArtifacts } from 'src/utils/transform';

export type SubjectDocument = Subject & Document;

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

export { SubjectSchema };
