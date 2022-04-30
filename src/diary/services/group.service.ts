import { Group, GroupDocument, GroupSchema } from './../../schemas/groups.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { AnyKeys, FilterQuery, Model, Connection } from 'mongoose';
import { paginationLabels } from 'src/utils/transform';
import mongoose from 'mongoose';

@Injectable()
export class GroupService {
  constructor(@InjectModel(Group.name) private groupModel: Model<GroupDocument>, @InjectConnection() private connection: Connection) {}

  async getAll(object: FilterQuery<any> = {}, page = 1, limit = 24) {
    const groupPaginatedModel = this.connection.model<GroupDocument, mongoose.PaginateModel<GroupDocument>>('Groups', GroupSchema, 'groups');

    return await groupPaginatedModel.paginate(object, {
      page: page,
      limit: limit,
      customLabels: paginationLabels,
    });
  }

  async getOne(id) {
    const group = await this.groupModel.findById(id).exec();
    if (!group) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    return group;
  }

  async create(body: AnyKeys<GroupDocument>) {
    const group = await this.groupModel.findOne(body);
    if (group) throw new HttpException('Element with these parameters already exists!', HttpStatus.BAD_REQUEST);
    return this.groupModel.create(body);
  }

  async update(id, body: AnyKeys<GroupDocument>) {
    const group = await this.groupModel.findById(id);
    if (!group) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    Object.assign(group, body);
    return await group.save();
  }

  async delete(id) {
    const group = await this.groupModel.findById(id);
    if (!group) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    return await group.delete();
  }
}
