import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as pagination from 'mongoose-paginate-v2';
import { deleteArtifacts } from 'src/utils/transform';

export type RoleDocument = Role & mongoose.Document;

@Schema()
export class Role {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  permissions: string[];
}

const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => deleteArtifacts('roleId', doc, ret),
});

RoleSchema.plugin(pagination);

export { RoleSchema };
