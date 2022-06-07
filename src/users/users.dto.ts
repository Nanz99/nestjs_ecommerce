import { ApiProperty } from "@nestjs/swagger";


export class UserDto {
   @ApiProperty({ type: String, description: 'name' })
   name: string;
   @ApiProperty({ type: String, description: 'email' })
   email: string;
   @ApiProperty({ type: String, description: 'password' })
   password: string;
   @ApiProperty({ type: String, description: 'roleId' })
   roleId: string;
}