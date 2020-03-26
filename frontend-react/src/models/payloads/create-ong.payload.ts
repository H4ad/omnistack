/**
 * A classe que representa as informações que serão usadas para criar uma ong
 */
export interface CreateOngPayload {

  /**
   * O nome dessa ong
   */
  name: string;

  /**
   * A cidade na qual está localizada essa ong
   */
  city: string;

  /**
   * O estado na qual está localizada essa ong
   */
  uf: string;

  /**
   * O número de WhatsApp para entrar em contato com essa ong
   */
  whatsapp: string;

}
