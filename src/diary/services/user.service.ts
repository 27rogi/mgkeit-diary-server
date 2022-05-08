import { User, UserDocument, UserSchema } from '../../schemas/users.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { AnyKeys, FilterQuery, Model, Connection, PaginateModel } from 'mongoose';
import faker from '@faker-js/faker';
import { Group, GroupDocument } from 'src/schemas/groups.schema';
import { Role, RoleDocument } from 'src/schemas/roles.schema';
import { paginationLabels } from 'src/utils/transform';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async getAll(object: FilterQuery<any> = {}, populate = null, page = 1, limit = 24) {
    const userPaginatedModel = this.connection.model<UserDocument, PaginateModel<UserDocument>>('Users', UserSchema, 'users');

    return await userPaginatedModel.paginate(object, {
      populate: populate,
      page: page,
      limit: limit,
      customLabels: paginationLabels,
    });
  }

  async getOne(details: FilterQuery<User> = {}, detailed = false) {
    if (detailed) return this.userModel.findOne(details).populate(['group', 'role', 'owner']).exec();
    else return this.userModel.findOne(details).exec();
  }

  async create(body: AnyKeys<UserDocument>) {
    const user = await this.userModel.findOne(body);
    if (user) throw new HttpException('User with same details already exists!', HttpStatus.BAD_REQUEST);
    return this.userModel.create(body);
  }

  async update(id, body: AnyKeys<RoleDocument>) {
    const user = await this.userModel.findById(id);
    if (!user) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    Object.assign(user, body);
    return await user.save();
  }

  async delete(id) {
    const user = await this.userModel.findById(id);
    if (!user) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    return await user.delete();
  }
}
