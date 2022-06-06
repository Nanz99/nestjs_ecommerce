import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

   
   login(){
      return 'login';
   }

   register(input){
      return 'register';
   }


}
