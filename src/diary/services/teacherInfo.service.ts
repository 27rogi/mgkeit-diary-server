import {
  TeacherInfo,
  TeacherInfoDocument,
  TeacherInfoSchema,
} from './../../schemas/teacherInfo.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { AnyKeys, FilterQuery, Model, Connection } from 'mongoose';
import { paginationLabels } from 'src/utils/transform';
import mongoose from 'mongoose';

@Injectable()
export class TeacherInfoService {
  constructor(
    @InjectModel(TeacherInfo.name) private teacherInfoModel: Model<TeacherInfoDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async getAll(object: FilterQuery<any> = {}, page = 1, limit = 24) {
    const teacherInfoPaginatedModel = this.connection.model<
      TeacherInfoDocument,
      mongoose.PaginateModel<TeacherInfoDocument>
    >('TeacherInfos', TeacherInfoSchema, 'teacherInfos');

    return await teacherInfoPaginatedModel.paginate(object, {
      page: page,
      limit: limit,
      customLabels: paginationLabels,
    });
  }

  async getOne(id) {
    const teacherInfo = await this.teacherInfoModel.findById(id).exec();
    if (!teacherInfo) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    return teacherInfo;
  }

  async create(body: AnyKeys<TeacherInfoDocument>) {
    const teacherInfo = await this.teacherInfoModel.findOne(body);
    if (teacherInfo)
      throw new HttpException(
        'Element with these parameters already exists!',
        HttpStatus.BAD_REQUEST,
      );
    return this.teacherInfoModel.create(body);
  }

  async update(id, body: AnyKeys<TeacherInfoDocument>) {
    const teacherInfo = await this.teacherInfoModel.findById(id);
    if (!teacherInfo) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    Object.assign(teacherInfo, body);
    return await teacherInfo.save();
  }

  async delete(id) {
    const teacherInfo = await this.teacherInfoModel.findById(id);
    if (!teacherInfo) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    return await teacherInfo.delete();
  }
}
