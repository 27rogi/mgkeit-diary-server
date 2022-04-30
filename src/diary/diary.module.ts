import { TeacherInfoService } from './services/teacherInfo.service';
import { SubjectService } from './services/subject.service';
import { ScheduleService } from './services/schedule.service';
import { RoleService } from './services/role.service';
import { ReplacementService } from './services/replacement.service';
import { HomeworkService } from './services/homework.service';
import { GroupService } from './services/group.service';
import { GradeService } from './services/grade.service';
import { TeacherInfoController } from './controllers/teacherInfo.controller';
import { SubjectController } from './controllers/subject.controller';
import { ScheduleController } from './controllers/schedule.controller';
import { RoleController } from './controllers/role.controller';
import { ReplacementController } from './controllers/replacement.controller';
import { HomeworkController } from './controllers/homework.controller';
import { GroupController } from './controllers/group.controller';
import { GradeController } from './controllers/grade.controller';
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
import { Homework, HomeworkSchema } from './../schemas/homeworks.schema';
import { Group, GroupSchema } from './../schemas/groups.schema';
import { Grade, GradeSchema } from './../schemas/grades.schema';
import { Bell, BellSchema } from './../schemas/bells.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BellController } from './controllers/bell.controller';
import { BellService } from './services/bell.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bell.name, schema: BellSchema }]),
    MongooseModule.forFeature([{ name: Grade.name, schema: GradeSchema }]),
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    MongooseModule.forFeature([
      { name: Homework.name, schema: HomeworkSchema },
    ]),
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
  controllers: [
    BellController,
    GradeController,
    GroupController,
    HomeworkController,
    ReplacementController,
    RoleController,
    ScheduleController,
    SubjectController,
    TeacherInfoController,
  ],
  providers: [
    BellService,
    GradeService,
    GroupService,
    HomeworkService,
    ReplacementService,
    RoleService,
    ScheduleService,
    SubjectService,
    TeacherInfoService,
  ],
})
export class DiaryModule {}
