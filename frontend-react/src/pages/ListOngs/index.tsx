//#region Imports

import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import OngItem from '../../components/OngItem';
import { OngProxy } from '../../models/proxies/ong.proxy';
import { getOngs } from '../../services/api';

import './styles.css';

//#endregion

/**
 * O componente que representa a página de listagem de ongs
 *
 * @constructor
 */
export default function ListOngs() {

  //#region States

  const [error, setError] = useState('');
  const [listOngs, setListOngs] = useState<OngProxy[]>([]);

  //#endregion

  //#region Effects

  useEffect(() => {
    getOngs().then(ongs => {
      if (typeof ongs === 'string')
        return void setError(ongs);

      setListOngs(ongs);
    });
  }, []);

  //#endregion

  return (
    <div className="list--container">
      <Header actionButtonText="Cadastrar nova ong" actionRoute="/ongs/create"/>
      <div className="list--body">
        <h1>Ongs cadastradas</h1>
        <h3 className="form--error">{ error }</h3>
        <div className="list--body--grid">
          { listOngs.map(ong => {
            return (
              <OngItem key={ong.id} {...ong}/>
            );
          }) }
        </div>
      </div>
    </div>
  );
}
