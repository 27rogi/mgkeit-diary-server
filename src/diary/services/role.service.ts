import { Role, RoleDocument, RoleSchema } from './../../schemas/roles.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { AnyKeys, FilterQuery, Model, Connection } from 'mongoose';
import { paginationLabels } from 'src/utils/transform';
import mongoose from 'mongoose';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async getAll() {
    return await this.roleModel.find();
  }

  async getOne(id) {
    const role = await this.roleModel.findById(id).exec();
    if (!role) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    return role;
  }

  async create(body: AnyKeys<RoleDocument>) {
    const role = await this.roleModel.findOne(body);
    if (role)
      throw new HttpException(
        'Element with these parameters already exists!',
        HttpStatus.BAD_REQUEST,
      );
    return this.roleModel.create(body);
  }

  async update(id, body: AnyKeys<RoleDocument>) {
    const role = await this.roleModel.findById(id);
    if (!role) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    Object.assign(role, body);
    return await role.save();
  }

  async delete(id) {
    const role = await this.roleModel.findById(id);
    if (!role) throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    return await role.delete();
  }
}
