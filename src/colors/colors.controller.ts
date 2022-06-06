import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ColorsService } from './colors.service';
import { ColorDto } from './colors.dto';

@ApiTags('Colors')
@Controller('colors')
export class ColorsController {
  constructor(private readonly colorService: ColorsService) {}
  @ApiOperation({ summary: 'Get list colors' })
  @Get('/')
  listCategories(): Promise<ColorDto[]> {
    return this.colorService.getAll();
  }
  @ApiOperation({ summary: 'Create color' })
  @Post('/')
  createCategory(@Body() category: ColorDto): Promise<any> {
    return this.colorService.create(category);
  }
  @ApiOperation({ summary: 'Get color by Id' })
  @Get('/:id')
  getCategoryById(@Param('id') id: String): Promise<ColorDto> {
    return this.colorService.getById(id);
  }

  @ApiOperation({ summary: 'Update color by Id' })
  @Put('/:id')
  updateCategory(
    @Param('id') id: String,
    @Body() color: ColorDto,
  ): Promise<any> {
    return this.colorService.update(id, color);
  }

  @ApiOperation({ summary: 'Delete color by Id' })
  @Delete('/:id')
  deleteCategory(@Param('id') id: String): Promise<any> {
    return this.colorService.delete(id);
  }
}
