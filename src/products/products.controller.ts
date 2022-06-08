import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FormDataRequest } from 'nestjs-form-data';
import { ProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UserDto } from 'src/users/users.dto';

@ApiTags('Product')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  // @UseGuards(AuthGuard())
  getAllProducts(): // @CurrentUser() user: UserDto
  Promise<ProductDto[]> {
    return this.productsService.getAllProducts();
  }

  @Get('/:id')
  public getProductById(@Param('id') id: String): Promise<ProductDto> {
    return this.productsService.getById(id);
  }

  //! create product
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
        countInStock: { type: 'number', default: 10 },
        information: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              colorId: { type: 'string', default: '1' },
              sizeId: { type: 'string', default: '2' },
              salePrice: { type: 'number', default: 10 },
              purchasePrice: { type: 'number', default: 10 },
              retailPrice: { type: 'number', default: 10 },
            },
          },
        },
      },
    },
  })
  // @FormDataRequest()
  @UseInterceptors(
    FileInterceptor('imageUrl', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename: string =
            path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
          const extension: string = path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  //! create product
  createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() product: ProductDto,
  ): any {
    //convert string object to two object

    return this.productsService.create({
      ...product,
      information: JSON.parse(product.information.replaceAll(`'`, `"`)),
      imageUrl: file?.path || '',
    });
  }

  //! update product
  @Put('/:id')
  updateProduct(@Param('id') id: String, @Body() product: ProductDto): any {
    return this.productsService.update(id, product);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: String): any {
    return this.productsService.delete(id);
  }

  //!upload Image
  @Post('/:id/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename: string =
            path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
          const extension: string = path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: String,
  ): any {
    console.log(file);
    return this.productsService.uploadImage(id, file.path);
    // return of({imagePath: file.path})
  }
  //? get image
  // @Post('/:id/gallery')
  // @UseInterceptors(
  //   FileInterceptor('files', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, cb) => {
  //         const filename: string =
  //           path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
  //         const extension: string = path.parse(file.originalname).ext;
  //         cb(null, `${filename}${extension}`);
  //       },
  //     }),
  //   }),
  // )
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       files: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  // uploadImageGallery(
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  //   @Param('id') id: String,
  // ): any {
  //   console.log(files);
  //   // return this.productsService.uploadImage(id, file.path);
  //   return of({imagePath: files.path})
  // }

  //! Sale
  @Put('/:id/sale')
  @ApiOperation({ summary: 'Update status sale' })
  updateStatusSale(@Param('id') id: String): any {
    return this.productsService.updateStatusSale(id);
  }
}
