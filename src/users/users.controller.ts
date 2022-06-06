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
import { UserDto } from './users.dto';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('/')
  @ApiOperation({ summary: 'Get list users' })
  listUsers(): Promise<any> {
    return this.userService.getAll();
  }
  @ApiOperation({ summary: 'Create user' })
  @Post('/')
  createUser(@Body() user: UserDto): Promise<any> {
    return this.userService.create(user);
  }
  @ApiOperation({ summary: 'Get size by Id' })
  @Get('/:id')
  getUserById(@Param('id') id: String): Promise<UserDto> {
    return this.userService.getById(id);
  }

  @ApiOperation({ summary: 'Update user by Id' })
  @Put('/:id')
  updateUser(@Param('id') id: String, @Body() user: UserDto): Promise<any> {
    return this.userService.update(id, user);
  }

  @ApiOperation({ summary: 'Delete user by Id' })
  @Delete('/:id')
  deleteUser(@Param('id') id: String): Promise<any> {
    return this.userService.delete(id);
  }
}
