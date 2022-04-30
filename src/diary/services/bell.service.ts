import { Bell, BellDocument, BellSchema } from './../../schemas/bells.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { AnyKeys, FilterQuery, Model, Connection } from 'mongoose';
import { paginationLabels } from 'src/utils/transform';
import mongoose from 'mongoose';

@Injectable()
export class BellService {
  constructor(@InjectModel(Bell.name) private bellModel: Model<BellDocument>, @InjectConnection() private connection: Connection) {}

  async getAll(object: FilterQuery<any> = {}, page = 1, limit = 24) {
    const bellPaginatedModel = this.connection.model<BellDocument, mongoose.PaginateModel<BellDocument>>('Bells', BellSchema, 'bells');

    return await bellPaginatedModel.paginate(object, {
      page: page,
      limit: limit,
      customLabels: paginationLabels,
    });
  }

  async getOne(id) {
    const bell = await this.bellModel.findById(id).exec();
    if (!bell) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    return bell;
  }

  async create(body: AnyKeys<BellDocument>) {
    const bell = await this.bellModel.findOne(body);
    if (bell) throw new HttpException('Element with these parameters already exists!', HttpStatus.BAD_REQUEST);
    return this.bellModel.create(body);
  }

  async update(id, body: AnyKeys<BellDocument>) {
    const bell = await this.bellModel.findById(id);
    if (!bell) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    Object.assign(bell, body);
    return await bell.save();
  }

  async delete(id) {
    const bell = await this.bellModel.findById(id);
    if (!bell) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    return await bell.delete();
  }
}
