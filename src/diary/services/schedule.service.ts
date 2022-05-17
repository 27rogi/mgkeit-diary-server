import { Schedule, ScheduleDocument, ScheduleSchema } from './../../schemas/schedules.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { AnyKeys, FilterQuery, Model, Connection } from 'mongoose';
import { paginationLabels } from 'src/utils/transform';
import mongoose from 'mongoose';

@Injectable()
export class ScheduleService {
  constructor(@InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>, @InjectConnection() private connection: Connection) {}

  async getAll(object: FilterQuery<any> = {}, page = 1, limit = 24) {
    const schedulePaginatedModel = this.connection.model<ScheduleDocument, mongoose.PaginateModel<ScheduleDocument>>(
      'Schedules',
      ScheduleSchema,
      'schedules',
    );

    return await schedulePaginatedModel.paginate(object, {
      populate: ['group'],
      page: page,
      limit: limit,
      customLabels: paginationLabels,
    });
  }

  async getOne(object: FilterQuery<any>, detailed) {
    const schedule = this.scheduleModel.findOne(object);
    if (detailed) {
      schedule.populate([
        'group',
        {
          path: 'days',
          populate: {
            path: 'lessons',
            populate: [
              'subject',
              'bell',
              'teacher',
              {
                path: 'replacement',
                populate: ['subject', 'teacher'],
              },
            ],
          },
        },
      ]);
    }

    const res = await schedule.exec();
    if (!res) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    return res;
  }

  async create(body: AnyKeys<ScheduleDocument>) {
    const schedule = await this.scheduleModel.findOne(body);
    if (schedule) throw new HttpException('Element with these parameters already exists!', HttpStatus.BAD_REQUEST);
    return this.scheduleModel.create(body);
  }

  async update(id, body: AnyKeys<ScheduleDocument>) {
    const schedule = await this.scheduleModel.findById(id);
    if (!schedule) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    Object.assign(schedule, body);
    return await schedule.save();
  }

  async delete(id) {
    const schedule = await this.scheduleModel.findById(id);
    if (!schedule) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    return await schedule.delete();
  }
}
