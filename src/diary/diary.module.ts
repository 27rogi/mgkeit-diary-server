import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { User, UserSchema } from './../schemas/users.schema';
import {
  TeacherInfo,
  TeacherInfoSchema,
} from './../schemas/teacherInfo.schema';
import { Subject, SubjectSchema } from './../schemas/subjects.schema';
import { Schedule, ScheduleSchema } from './../schemas/schedules.schema';
import { Role, RoleSchema } from './../schemas/roles.schema';
import {
  Replacement,
  ReplacementSchema,
} from './../schemas/replacements.schema';
import { Lesson, LessonSchema } from './../schemas/lessons.schema';
import { Homework, HomeworkSchema } from './../schemas/homeworks.schema';
import { Group, GroupSchema } from './../schemas/groups.schema';
import { Grade, GradeSchema } from './../schemas/grades.schema';
import { Bell, BellSchema } from './../schemas/bells.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bell.name, schema: BellSchema }]),
    MongooseModule.forFeature([{ name: Grade.name, schema: GradeSchema }]),
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    MongooseModule.forFeature([
      { name: Homework.name, schema: HomeworkSchema },
    ]),
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }]),
    MongooseModule.forFeature([
      { name: Replacement.name, schema: ReplacementSchema },
    ]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([
      { name: Schedule.name, schema: ScheduleSchema },
    ]),
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }]),
    MongooseModule.forFeature([
      { name: TeacherInfo.name, schema: TeacherInfoSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class DiaryModule {}
