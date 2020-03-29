//#region Imports

import { BaseCrudProxy } from './base.proxy';
import { OngProxy } from './ong.proxy';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre um incidente
 */
export interface IncidentProxy extends BaseCrudProxy {

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

  /**
   * As informações da ong na qual esse caso pertence
   */
  ong: OngProxy;

}

/**
 * Método que retorna as informações de um falso incidente
 */
export function getFakeIncident(): IncidentProxy {
  return {
    id: Math.floor(Math.random() * 100000),
    title: 'Cadelinha atropelada',
    description: 'Uma cadelinha foi atropelada de forma cruel por um cara que fugiu depois.',
    value: 120,
    ongId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    ong: {
      id: 1,
      name: 'APAD',
      userId: 1,
      whatsapp: '5515988116118',
      uf: 'SP',
      city: 'Sorocaba',
      email: 'contato@apad.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
  };
}

/**
 * Método que retorna as informações de um falso incidente
 */
export function getFakeListIncidents(quantity: number): IncidentProxy[] {
  const listIncidents: IncidentProxy[] = [];

  for (let i = 0; i < quantity; i++)
    listIncidents.push(getFakeIncident());

  return listIncidents;
}
