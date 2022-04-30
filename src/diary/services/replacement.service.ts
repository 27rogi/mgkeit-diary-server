import { Replacement, ReplacementDocument, ReplacementSchema } from './../../schemas/replacements.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { AnyKeys, FilterQuery, Model, Connection } from 'mongoose';
import { paginationLabels } from 'src/utils/transform';
import mongoose from 'mongoose';

@Injectable()
export class ReplacementService {
  constructor(
    @InjectModel(Replacement.name)
    private replacementModel: Model<ReplacementDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async getAll(object: FilterQuery<any> = {}, page = 1, limit = 24) {
    const replacementPaginatedModel = this.connection.model<ReplacementDocument, mongoose.PaginateModel<ReplacementDocument>>(
      'Replacements',
      ReplacementSchema,
      'replacements',
    );

    return await replacementPaginatedModel.paginate(object, {
      page: page,
      limit: limit,
      customLabels: paginationLabels,
    });
  }

  async getOne(id) {
    const replacement = await this.replacementModel.findById(id).exec();
    if (!replacement) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    return replacement;
  }

  async create(body: AnyKeys<ReplacementDocument>) {
    const replacement = await this.replacementModel.findOne(body);
    if (replacement) throw new HttpException('Element with these parameters already exists!', HttpStatus.BAD_REQUEST);
    return this.replacementModel.create(body);
  }

  async update(id, body: AnyKeys<ReplacementDocument>) {
    const replacement = await this.replacementModel.findById(id);
    if (!replacement) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    Object.assign(replacement, body);
    return await replacement.save();
  }

  async delete(id) {
    const replacement = await this.replacementModel.findById(id);
    if (!replacement) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    return await replacement.delete();
  }
}
