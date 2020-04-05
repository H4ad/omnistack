/**
 * A classe que representa as informações básicas de toda entidade que será enviada para o usuário
 */
export interface BaseCrudProxy {

  /**
   * A identificação do post
   */
  id: number;

  /**
   * Diz quando foi criado essa postagem
   */
  createdAt: string;

  /**
   * Diz quando foi atualizado essa postagem
   */
  updatedAt: string;

  /**
   * Diz se está ativo
   */
  isActive: boolean;

}
