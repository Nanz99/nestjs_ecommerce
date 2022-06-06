import { ApiProperty } from "@nestjs/swagger";
import { LoginDto } from "./loign.dto";

export class CreateUserDto extends LoginDto {

  @ApiProperty({ type: String, description: 'name' })
  name: string;
  
}