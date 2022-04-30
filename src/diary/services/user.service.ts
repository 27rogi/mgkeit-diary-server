import { User, UserDocument } from '../../schemas/users.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyKeys, FilterQuery, Model } from 'mongoose';
import faker from '@faker-js/faker';
import { Group, GroupDocument } from 'src/schemas/groups.schema';
import { Role, RoleDocument } from 'src/schemas/roles.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userModel.find().populate('group').exec();
  }

  async getOne(details: FilterQuery<User> = {}, detailed = false): Promise<User> {
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
