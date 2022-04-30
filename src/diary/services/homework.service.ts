import { Homework, HomeworkDocument, HomeworkSchema } from './../../schemas/homeworks.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { AnyKeys, FilterQuery, Model, Connection } from 'mongoose';
import { paginationLabels } from 'src/utils/transform';
import mongoose from 'mongoose';

@Injectable()
export class HomeworkService {
  constructor(@InjectModel(Homework.name) private homeworkModel: Model<HomeworkDocument>, @InjectConnection() private connection: Connection) {}

  async getAll(object: FilterQuery<any> = {}, page = 1, limit = 24) {
    const homeworkPaginatedModel = this.connection.model<HomeworkDocument, mongoose.PaginateModel<HomeworkDocument>>(
      'Homeworks',
      HomeworkSchema,
      'homeworks',
    );

    return await homeworkPaginatedModel.paginate(object, {
      page: page,
      limit: limit,
      customLabels: paginationLabels,
    });
  }

  async getOne(id) {
    const homework = await this.homeworkModel.findById(id).exec();
    if (!homework) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    return homework;
  }

  async create(body: AnyKeys<HomeworkDocument>) {
    const homework = await this.homeworkModel.findOne(body);
    if (homework) throw new HttpException('Element with these parameters already exists!', HttpStatus.BAD_REQUEST);
    return this.homeworkModel.create(body);
  }

  async update(id, body: AnyKeys<HomeworkDocument>) {
    const homework = await this.homeworkModel.findById(id);
    if (!homework) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    Object.assign(homework, body);
    return await homework.save();
  }

  async delete(id) {
    const homework = await this.homeworkModel.findById(id);
    if (!homework) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    return await homework.delete();
  }
}
