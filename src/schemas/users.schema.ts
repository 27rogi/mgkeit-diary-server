import { Role } from './roles.schema';
import { Group } from './groups.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { deleteArtifacts } from 'src/utils/transform';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({ required: true })
  fio: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true })
  group: Group;

  @Prop({ required: true })
  birthday: Date;

  @Prop({ required: true })
  address: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true })
  role: Role;

  @Prop({ required: true, select: false })
  password: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => deleteArtifacts('userId', doc, ret),
});

export { UserSchema };
