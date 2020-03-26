/**
 * A classe que representa o payload enviado para criar um usuário
 */
export interface CreateUserPayload {

  /**
   * O e-mail do usuário
   */
  email: string;

  /**
   * A senha do usuário
   */
  password: string;

}
