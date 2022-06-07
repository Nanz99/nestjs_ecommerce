import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: String, description: 'email' })
  @IsNotEmpty()
  @IsEmail()
  email: String;

  @ApiProperty({ type: String, description: 'password' })
  @MinLength(6)
  password: String;
}
