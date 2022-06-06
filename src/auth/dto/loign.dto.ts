import { ApiProperty } from "@nestjs/swagger";
import { MinLength } from "class-validator";

export class LoginDto {

      @ApiProperty({ type: String, description: 'email' })
      email: String;

      @ApiProperty({ type: String, description: 'password' })
      @MinLength(6)
      password: String;
}