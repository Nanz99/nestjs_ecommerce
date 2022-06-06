import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ColorDto } from './colors.dto';

@Injectable()
export class ColorsService {
  constructor(
    @InjectModel('Color') private readonly colorModel: Model<ColorDto>,
  ) {}
  async create(color: ColorDto) {
    const createdCategory = new this.colorModel(color);
    return {
      message: 'Color has been created',
      color: await createdCategory.save(),
    };
  }
  async getAll() {
    return await this.colorModel.find({});
  }
  async getById(id) {
    const color = await this.colorModel.findById(id);
     if (!color) {
       throw new NotFoundException('Color not found');
     }
    return color;
  }
  async update(id, c) {
    const color = await this.colorModel.findById(id);
    if (!color) {
      throw new NotFoundException('Color not found');
    }
    return {
      message: 'Color has been updated',
      color: this.colorModel.findByIdAndUpdate(id, c, {
        new: true,
      }),
    };
  }
  async delete(id) {
    const color = this.colorModel.findById(id);
    if (!color) {
      throw new NotFoundException('Color not found');
    }
    return {
      message: 'Color has been deleted',
      color: await this.colorModel.findByIdAndRemove(id),
    };
  }
}
