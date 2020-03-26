//#region Imports

import React from 'react';

import { FiTrash2 } from 'react-icons/fi';

import './styles.css';
import { IncidentProxy } from '../../models/proxies/incident.proxy';

//#endregion

/**
 * O componente que representa um item que contem as informações de um incidente
 *
 * @constructor
 */
export default function IncidentItem({ title, description, value }: IncidentProxy) {
  return (
    <div className="incident-item">
      <div className="incident-item--trash">
        <FiTrash2 size={ 18 } color="#A8A8B3"/>
      </div>
      <strong>Caso:</strong>
      <p>{ title }</p>

      <strong>Descrição:</strong>
      <p>{ description }</p>

      <strong>Valor:</strong>
      <p>R$ { value.toFixed(2) } reais</p>
    </div>
  );
}
