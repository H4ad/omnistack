//#region Imports

import React from 'react';

import { FiEye } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { OngProxy } from '../../models/proxies/ong.proxy';

import './styles.css';

//#endregion

/**
 * O componente que representa um item que contem as informações de uma ong
 *
 * @constructor
 */
export default function OngItem({ name, whatsapp, city, uf, id }: OngProxy) {

  //#region States

  const history = useHistory();

  //#endregion

  //#region Methods

  /**
   * Método que é executado quando o usuário quer ver as informações da ong
   */
  function onClickToSee(): void {
    history.push(`/ongs/${ id }/incidents`);
  }

  //#endregion

  return (
    <div className="ong-item">
      <div onClick={onClickToSee} className="ong-item--see">
        <FiEye size={ 18 } color="#A8A8B3"/>
      </div>
      <strong>Nome:</strong>
      <p>{ name }</p>

      <strong>WhatsApp:</strong>
      <p>{ whatsapp }</p>

      <strong>Cidade:</strong>
      <p>{ city }</p>

      <strong>UF:</strong>
      <p>{ uf }</p>
    </div>
  );
}
