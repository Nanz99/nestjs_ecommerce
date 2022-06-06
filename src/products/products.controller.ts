import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { ProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@ApiTags('Product')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get('/')
  getAllProducts(): Promise<ProductDto[]> {
    return this.productsService.getAllProducts();
  }
  @Get('/:id')
  public getProductById(@Param('id') id: String): Promise<ProductDto> {
    return this.productsService.getById(id);
  }
  @Post('/')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', default: 'test' },
        categoryId: { type: 'string', default: '629c8c487d3590baf70a925d' },
        imageUrl: {
          type: 'string',
          format: 'binary',
        },
        price: { type: 'number', default: 110 },
        description: { type: 'string', default: 'test' },
        colors: {
          type: 'array',
          items: {
            type: 'string',
            default: '629cad67978e88a9d4f9d120',
            // properties: {
            //   name: { type: 'string' },
            //   description: { type: 'string' },
            // },
          },
        },
        sizes: {
          type: 'array',
          items: {
            type: 'string',
            default: '629ced69b9e613e85f2b3ee8',
          },
        },
        countInStock: { type: 'number', default: 10 },
      },
    },
  })
  @FormDataRequest()
  createProduct(@Body() product: ProductDto): Promise<any> {
    console.log(product);
    return this.productsService.create(product);
  }
  @Put('/:id')
  updateProduct(@Param('id') id: String, @Body() product: ProductDto): any {
    return this.productsService.update(id, product);
  }
  @Delete('/:id')
  deleteProduct(@Param('id') id: any): any {
    return this.productsService.delete(id);
  }
  @Post('/:id/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
