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
import { RoleDto } from './roles.dto';
import { RolesService } from './roles.service';

@ApiTags('Role')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Get('/')
  @ApiOperation({ summary: 'get list roles' })
  getAllRoles(): Promise<RoleDto[]> {
    return this.rolesService.getAll();
  }
  @Get('/:id')
  @ApiOperation({ summary: 'get role by id' })
  public getRoleById(@Param('id') id: any): Promise<RoleDto> {
    return this.rolesService.getById(id);
  }
  @Post('/')
  @ApiOperation({ summary: 'Create role' })
  createProduct(@Body() role: RoleDto): Promise<any> {
    return this.rolesService.create(role);
  }
  @Put('/:id')
  @ApiOperation({ summary: 'Update role' })
  updateProduct(@Param('id') id: String, @Body() role: RoleDto): Promise<any> {
    return this.rolesService.update(id, role);
  }
  @Delete('/:id')
   @ApiOperation({ summary: 'Delete role' })
  deleteProduct(@Param('id') id: String): Promise<any> {
    return this.rolesService.delete(id);
  }
}
