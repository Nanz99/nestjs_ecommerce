import { IsString } from 'class-validator';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryDto } from 'src/category/categoty.dto';
import { ColorDto } from 'src/colors/colors.dto';
import { SizeDto } from 'src/sizes/sizes.dto';
import { HasMimeType } from 'nestjs-form-data';

export class ProductDto extends mongoose.Document {
  @IsString()
  @ApiProperty({ type: String })
  name?: string;

  @ApiProperty({ type: Object })
  categoryId: CategoryDto;

  @ApiProperty({ type: String })
  @IsString()
  @HasMimeType(['image/jpeg', 'image/png'])
  imageUrl?: String;

  @ApiProperty({ type: Array })
  colors: ColorDto[];

  @ApiProperty({ type: Array })
  sizes?: SizeDto[];

  @ApiProperty({ type: Number })
  price?: Number;

  @ApiProperty({ type: Number })
  countInStock?: Number;

  @ApiProperty({ type: String })
  description: String;

  @ApiProperty({ type: Array })
  information: any;
}
