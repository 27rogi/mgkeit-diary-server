import { Group } from './groups.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Lesson } from './lessons.schema';
import { deleteArtifacts } from 'src/utils/transform';

export type ScheduleDocument = Schedule & Document;

@Schema()
export class Schedule {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }] })
  lessons: Lesson[];

  @Prop({ required: true })
  weekDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true })
  group: Group;
}

const ScheduleSchema = SchemaFactory.createForClass(Schedule);

ScheduleSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => deleteArtifacts('scheduleId', doc, ret),
});

export { ScheduleSchema };
