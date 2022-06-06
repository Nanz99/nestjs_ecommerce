import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SizeDto } from './sizes.dto';
import { SizesService } from './sizes.service';


@ApiTags('Size')
@Controller('sizes')
export class SizesController {
  constructor(private readonly sizeService: SizesService) {}
  @ApiOperation({ summary: 'Get list sizes' })
  @Get('/')
  listCategories(): Promise<SizeDto[]> {
    return this.sizeService.getAll();
  }
  @ApiOperation({ summary: 'Create size' })
  @Post('/')
  createCategory(@Body() category: SizeDto): Promise<any> {
    return this.sizeService.create(category);
  }
  @ApiOperation({ summary: 'Get size by Id' })
  @Get('/:id')
  getCategoryById(@Param('id') id: String): Promise<SizeDto> {
    return this.sizeService.getById(id);
  }

  @ApiOperation({ summary: 'Update size by Id' })
  @Put('/:id')
  updateCategory(@Param('id') id: String, @Body() size: SizeDto): Promise<any> {
    return this.sizeService.update(id, size);
  }

  @ApiOperation({ summary: 'Delete size by Id' })
  @Delete('/:id')
  deleteCategory(@Param('id') id: String): Promise<any> {
    return this.sizeService.delete(id);
  }
}
