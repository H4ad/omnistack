/**
 * A classe que representa o payload enviado para criar um incidente
 */
export interface CreateIncidentPayload {

  /**
   * O titulo desse incidente
   */
  title: string;

  /**
   * A descrição desse caso
   */
  description: string;

  /**
   * O valor para ajudar esse caso
   */
  value: number;

  /**
   * A identificação da ong na qual esse caso pertence
   */
  ongId: number;

}
