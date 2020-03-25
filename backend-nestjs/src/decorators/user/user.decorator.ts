//#region Imports

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//#endregion

/**
 * O decorador que extrai as informações do usuário da rota
 */
export const User = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const http = context.switchToHttp();
  const request = http.getRequest();

  return request.user;
});
