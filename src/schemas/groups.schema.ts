import { User } from './users.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as pagination from 'mongoose-paginate-v2';
import { deleteArtifacts } from 'src/utils/transform';

export type GroupDocument = Group & mongoose.Document;

@Schema()
export class Group {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  teachStartDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  teacher: User;
}

const GroupSchema = SchemaFactory.createForClass(Group);

GroupSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => deleteArtifacts('groupId', doc, ret),
});

GroupSchema.plugin(pagination);

export { GroupSchema };
