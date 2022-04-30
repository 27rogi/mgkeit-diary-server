import {
  Subject,
  SubjectDocument,
  SubjectSchema,
} from './../../schemas/subjects.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { AnyKeys, FilterQuery, Model, Connection } from 'mongoose';
import { paginationLabels } from 'src/utils/transform';
import mongoose from 'mongoose';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject.name) private subjectModel: Model<SubjectDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async getAll(object: FilterQuery<any> = {}, page = 1, limit = 24) {
    const subjectPaginatedModel = this.connection.model<
      SubjectDocument,
      mongoose.PaginateModel<SubjectDocument>
    >('Subjects', SubjectSchema, 'subjects');

    return await subjectPaginatedModel.paginate(object, {
      page: page,
      limit: limit,
      customLabels: paginationLabels,
    });
  }

  async getOne(id) {
    const subject = await this.subjectModel.findById(id).exec();
    if (!subject) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    return subject;
  }

  async create(body: AnyKeys<SubjectDocument>) {
    const subject = await this.subjectModel.findOne(body);
    if (subject)
      throw new HttpException(
        'Element with these parameters already exists!',
        HttpStatus.BAD_REQUEST,
      );
    return this.subjectModel.create(body);
  }

  async update(id, body: AnyKeys<SubjectDocument>) {
    const subject = await this.subjectModel.findById(id);
    if (!subject) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    Object.assign(subject, body);
    return await subject.save();
  }

  async delete(id) {
    const subject = await this.subjectModel.findById(id);
    if (!subject) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    return await subject.delete();
  }
}
