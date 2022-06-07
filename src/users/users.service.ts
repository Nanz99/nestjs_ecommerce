import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDto>,
  ) {}
  async create(user: UserDto) {
    const createdUser = new this.userModel(user);
    await createdUser.populate({ path: 'roleId' });
    return {
      message: 'User has been created',
      product: await createdUser.save(),
    };
  }
  async getAll() {
    const user = await this.userModel.find({}).populate({ path: 'roleId' });
    return user;
  }
  async getById(id) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async update(id, s) {
    const size = await this.userModel.findById(id);
    if (!size) {
      throw new NotFoundException('Size not found');
    }
    return {
      message: 'Size has been updated',
      size: this.userModel.findByIdAndUpdate(id, s, {
        new: true,
      }),
    };
  }
  async delete(id) {
    const size = this.userModel.findById(id);
    if (!size) {
      throw new NotFoundException('User not found');
    }
    return {
      message: 'Size has been deleted',
      size: await this.userModel.findByIdAndRemove(id),
    };
  }
}
