import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { deleteArtifacts } from 'src/utils/transform';
import * as pagination from 'mongoose-paginate-v2';
import mongoose from 'mongoose';

export type BellDocument = Bell & mongoose.Document;

@Schema()
export class Bell {
  @Prop({ required: true })
  startTime: string;

  @Prop({ required: true })
  endTime: string;
}

const BellSchema = SchemaFactory.createForClass(Bell);

BellSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => deleteArtifacts('bellId', doc, ret),
});

BellSchema.plugin(pagination);

export { BellSchema };
