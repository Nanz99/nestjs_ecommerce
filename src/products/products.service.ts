import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductDto>,
  ) {}

  async getAllProducts(): Promise<ProductDto[]> {
    const products = await this.productModel.find({}).populate({ path: 'categoryId' });
    return products;
  }

  async create(product) {
    const createdProduct = new this.productModel(product);
    await createdProduct.populate({ path: 'categoryId' });
    return createdProduct.save();
  }

  async getById(id): Promise<ProductDto> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new HttpException('Product not found', 404);
    }
    await product.populate({ path: 'categoryId' });
    return product;
  }

  async update(id, product): Promise<any> {
    const updateProduct = await this.productModel.findByIdAndUpdate(
      id,
      product,
      {
        new: true,
      },
    );
    return {
      message: 'Product has been updated',
      updateProduct,
    };
  }

  async delete(id): Promise<any> {
    const product = await this.productModel.findByIdAndRemove(id);
    return {
      message: 'Product has been deleted',
      product,
    };
  }
}
