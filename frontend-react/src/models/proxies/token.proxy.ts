/**
 * A classe que representa as informações de um token de autenticação
 */
export interface TokenProxy {

  /**
   * O Bearer Token gerado pelo JWT
   */
  token: string;

  /**
   * A data de quando irá expirar
   */
  expiresAt: Date;

}
