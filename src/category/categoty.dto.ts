import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { QueryBuilder } from 'typeorm';

export class CategoryDto {
  @IsString()
  @ApiProperty({ type: String, description: 'name',  })
  name: string;

  @IsString()
  @ApiProperty({ type: String, description: 'description' })
  description: string;

  @ApiProperty({ type: Number, description: 'parentId' })
  parentId: number;

  @ApiProperty({ type: String, description: 'imageUrl', default: '' })
  @IsString()
  imageUrl: string;
}
