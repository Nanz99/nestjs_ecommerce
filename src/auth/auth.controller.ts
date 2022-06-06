import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto,  } from './dto/create-user.dto';
import { LoginDto,  } from './dto/loign.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginDto })
  @Post('/login')
  async login(@Body() input: LoginDto): Promise<any> {
    console.log(input);
    return this.authService.login();
  }
  @ApiOperation({ summary: 'Register user' })
  @ApiBody({ type: CreateUserDto })
  @Post('/register')
  async register(@Body() input: CreateUserDto) {
    return this.authService.register(input);
  }
}
