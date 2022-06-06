import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryDto } from './categoty.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @ApiOperation({ summary: 'Get list categories' })
  @Get('/')
  listCategories(): Promise<CategoryDto[]> {
    return this.categoryService.getAll();
  }
  @ApiOperation({ summary: 'Create category' })
  @Post('/')
  createCategory(@Body() category: CategoryDto): Promise<any> {
    return this.categoryService.create(category);
  }
  @ApiOperation({ summary: 'Get category by Id' })
  @Get('/:id')
  getCategoryById(@Param('id') id: String): Promise<CategoryDto> {
    return this.categoryService.getById(id);
  }

  @ApiOperation({ summary: 'Update category by Id' })
  @Put('/:id')
  updateCategory(
    @Param('id') id: String,
    @Body() category: CategoryDto,
  ): Promise<any> {
    return this.categoryService.update(id, category);
  }

  @ApiOperation({ summary: 'Delete category by Id' })
  @Delete('/:id')
  deleteCategory(@Param('id') id: String): Promise<any> {
    return this.categoryService.delete(id);
  }
}
