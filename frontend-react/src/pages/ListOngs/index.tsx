//#region Imports

import React from 'react';

import Header from '../../components/Header';
import OngItem from '../../components/OngItem';

import './styles.css';

//#endregion

/**
 * O componente que representa a página de listagem de ongs
 *
 * @constructor
 */
export default function ListOngs() {
  return (
    <div className="list--container">
      <Header actionButtonText="Cadastrar nova ong" actionRoute="/ongs/create"/>
      <div className="list--body">
        <h1>Ongs cadastradas</h1>
        <div className="list--body--grid">
          <OngItem name="Joga10" city="Sorocaba" uf="SP" whatsapp="1598861199" createdAt={new Date()} id={1} isActive={true} updatedAt={new Date()} userId={1}/>
        </div>
      </div>
    </div>
  );
}
