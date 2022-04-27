import { User, UserDocument } from '../../schemas/users.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('group').exec();
  }

  async createRole() {
    return this.roleModel.create({
      name: faker.commerce.productName(),
      permissions: [faker.animal.bear, faker.company.catchPhrase],
    });
  }

  async createGroup() {
    return this.groupModel.create({
      name: faker.commerce.productName(),
      teachStartDate: faker.date.past(),
    });
  }

  async createUser() {
    return this.userModel.create({
      fio: faker.name.findName(),
      group: '6267c5570f80e9f4646bb5b3',
      role: '6267c57f0f80e9f4646bb5bb',
      birthday: faker.date.past(),
      adress: faker.address.city(),
      password: faker.git.commitSha(),
    });
  }
}
