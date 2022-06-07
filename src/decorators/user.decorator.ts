

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from 'src/users/users.dto';

export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext): UserDto => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
