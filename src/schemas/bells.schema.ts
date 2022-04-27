import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { deleteArtifacts } from 'src/utils/transform';

export type BellDocument = Bell & Document;

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

export { BellSchema };
