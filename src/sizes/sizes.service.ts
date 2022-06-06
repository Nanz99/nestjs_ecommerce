import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SizeDto } from './sizes.dto';

@Injectable()
export class SizesService {
  constructor(
    @InjectModel('Size') private readonly sizeModel: Model<SizeDto>,
  ) {}
  async create(s: SizeDto) {
    const createdSize = new this.sizeModel(s);
    return {
      message: 'Size has been created',
      product: await createdSize.save(),
    };
  }
  async getAll() {
    return await this.sizeModel.find({});
  }
  async getById(id) {
    const size = await this.sizeModel.findById(id);
    if (!size) {
      throw new NotFoundException('Size not found');
    }
    return size;
  }
  async update(id, s) {
    const size = await this.sizeModel.findById(id);
    if (!size) {
      throw new NotFoundException('Size not found');
    }
    return {
      message: 'Size has been updated',
      size: this.sizeModel.findByIdAndUpdate(id, s, {
        new: true,
      }),
    };
  }
  async delete(id) {
    const size = this.sizeModel.findById(id);
    if (!size) {
      throw new NotFoundException('Size not found');
    }
    return {
      message: 'Size has been deleted',
      size: await this.sizeModel.findByIdAndRemove(id),
    };
  }
}
