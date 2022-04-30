import { Bell } from './bells.schema';
import { Group } from './groups.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as pagination from 'mongoose-paginate-v2';
import { deleteArtifacts } from 'src/utils/transform';
import { Subject, SubjectDocument, SubjectSchema } from './subjects.schema';
import { User } from './users.schema';
import { ReplacementSchema } from './replacements.schema';

export type ScheduleDocument = Schedule & mongoose.Document;

@Schema()
export class Lesson {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  })
  subject: Subject;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Bell', required: true })
  bell: Bell;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  teacher: User;

  @Prop({ required: true })
  location: string;
}

const LessonSchema = SchemaFactory.createForClass(Lesson);

LessonSchema.virtual('replacement', {
  ref: 'Replacement',
  localField: '_id',
  foreignField: 'lesson',
  justOne: true,
});

LessonSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => deleteArtifacts('lessonId', doc, ret),
});

@Schema({ _id: false })
export class ScheduleDays {
  @Prop({ type: [LessonSchema] })
  lessons: Lesson[];
  @Prop({ min: 1, max: 7, required: true })
  day: number;
}

const ScheduleDaysSchema = SchemaFactory.createForClass(ScheduleDays);

@Schema()
export class Schedule {
  @Prop({ type: [ScheduleDaysSchema], required: false })
  days: ScheduleDays[];

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

ScheduleSchema.plugin(pagination);

export { ScheduleSchema };
