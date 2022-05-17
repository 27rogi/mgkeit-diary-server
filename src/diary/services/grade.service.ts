import { Grade, GradeDocument, GradeSchema } from '../../schemas/grades.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { AnyKeys, FilterQuery, Model, Connection } from 'mongoose';
import { paginationLabels } from 'src/utils/transform';
import mongoose from 'mongoose';

@Injectable()
export class GradeService {
  constructor(@InjectModel(Grade.name) private gradeModel: Model<GradeDocument>, @InjectConnection() private connection: Connection) {}

  async getAll(object: FilterQuery<any> = {}, page = 1, limit = 24) {
    const gradePaginatedModel = this.connection.model<GradeDocument, mongoose.PaginateModel<GradeDocument>>('Grades', GradeSchema, 'grades');

    return await gradePaginatedModel.paginate(object, {
      populate: ['teacher', 'student', 'subject'],
      page: page,
      limit: limit,
      customLabels: paginationLabels,
    });
  }

  async getOne(id) {
    const grade = await this.gradeModel.findById(id).populate(['teacher', 'student', 'subject']).exec();
    if (!grade) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    return grade;
  }

  async create(body: AnyKeys<GradeDocument>) {
    const grade = await this.gradeModel.findOne(body);
    if (grade) {
      throw new HttpException('Element with these parameters already exists!', HttpStatus.BAD_REQUEST);
    }

    return this.gradeModel.create(body);
  }

  async update(id, body: AnyKeys<GradeDocument>) {
    const grade = await this.gradeModel.findById(id);
    if (!grade) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    Object.assign(grade, body);
    return await grade.save();
  }

  async delete(id) {
    const grade = await this.gradeModel.findById(id);
    if (!grade) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    return await grade.delete();
  }
}
