/**
 * A interface que representa as informações obtidas pelo token de autenticação
 */
export interface IJwtPayload {

  /**
   * A identificação do usuário
   */
  id: number;

  /**
   * O tempo em UNIX de quando foi gerado
   */
  iat?: number;

  /**
   * O tempo em UNIX de quando será expirado
   */
  exp?: number;
}
