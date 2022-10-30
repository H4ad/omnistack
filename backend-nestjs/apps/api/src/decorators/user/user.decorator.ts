//#region Imports

import { ExecutionContext, createParamDecorator } from '@nestjs/common';

//#endregion

export const User = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const http = context.switchToHttp();
  const request = http.getRequest();

  return request.user;
});
