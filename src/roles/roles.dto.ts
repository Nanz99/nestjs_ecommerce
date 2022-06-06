import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class RoleDto{
   @IsNotEmpty()
   @IsString()
   @ApiProperty({ type: String })
   name: string;


   @IsNotEmpty()
   @IsString()
   @ApiProperty({ type: String })
   description: string;


}