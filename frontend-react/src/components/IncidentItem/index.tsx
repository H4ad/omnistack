//#region Imports

import React, { useState } from 'react';

import { FiTrash2 } from 'react-icons/fi';

import { IncidentProxy } from '../../models/proxies/incident.proxy';
import { deleteIncident } from '../../services/api';

import './styles.css';

//#endregion

/**
 * O componente que representa um item que contem as informações de um incidente
 *
 * @constructor
 */
export default function IncidentItem({ id, title, description, value, onClickDelete }: IncidentProxy & { onClickDelete: (id: number) => void }) {

  //#region States

  const [error, setError] = useState('');

  //#endregion

  //#region Methods

  /**
   * Método executado ao clicar no botão de lixeira
   */
  async function onClickTrash(): Promise<void> {
    const deleteResponse = await deleteIncident(id);

    if (typeof deleteResponse === 'string')
      return void setError(deleteResponse);

    onClickDelete(id);
  }

  //#endregion

  return (
    <div className="incident-item">
      <h3 className="form--error">{ error }</h3>

      <div onClick={onClickTrash} className="incident-item--trash">
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
