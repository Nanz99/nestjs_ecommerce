import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDto } from './categoty.dto';
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categotyModel: Model<CategoryDto>,
  ) {}
  async create(category: CategoryDto) {
    const createdCategory = new this.categotyModel(category);
    return {
      message: 'Product has been created',
      product: await createdCategory.save(),
    };
  }
  async getAll() {
    return await this.categotyModel.find({});
  }
  async getById(id) {
    const product = await this.categotyModel.findById(id);
   //  if (!product) {
   //    throw new NotFoundException('Product not found');
   //  }
    return product;
  }
  async update(id, category) {
    const product = await this.categotyModel.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return {
      message: 'Product has been updated',
      product: this.categotyModel.findByIdAndUpdate(id, category, {
        new: true,
      }),
    };
  }
  async delete(id) {
    const product = this.categotyModel.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return {
      message: 'Product has been deleted',
      product: await this.categotyModel.findByIdAndRemove(id),
    };
  }
}
