//#region Imports

import * as H from 'history';
import React, { useEffect } from 'react';
import { BrowserRouter, NavLinkProps } from 'react-router-dom';
import { Route } from '../../../../backend-nestjs/src/utils/type.shared';

import Header from '../../components/Header';
import IncidentItem from '../../components/IncidentItem';

import './styles.css';

//#endregion

/**
 * O componente que representa a página de listagem de incidentes
 *
 * @constructor
 */
export default function ListIncidents(history: any) {
  const ongId = history.match.params;

  return (
    <div className="list--container">
      <Header actionButtonText="Cadastrar novo caso" actionRoute="/incidents/create"/>
      <div className="list--body">
        <h1>Casos cadastrados</h1>
        <div className="list--body--grid">
          <IncidentItem name="Cadelinha atropelada" description="A cadelinha Jolie foi atropelada por um carro no bairro Santana e teve que passar por uma cirurgia às pressas." price="120,00"/>
          <IncidentItem name="Cadelinha atropelada" description="A cadelinha Jolie foi atropelada por um carro no bairro Santana e teve que passar por uma cirurgia às pressas.ha Jolie foi atropelada por um carro no bairro Santana e teve que passar por uma cirurgia às pressas.ha Jolie foi atropelada por um carro no bairro Santana e teve que passar por uma cirurgia às pressas.ha Jolie foi atropelada por um carro no bairro Santana e teve que passar por uma cirurgia às pressas.ha Jolie foi atropelada por um carro no bairro Santana e teve que passar por uma cirurgia às pressas.ha Jolie foi atropelada por um carro no bairro Santana e teve que passar por uma cirurgia às pressas." price="120,00"/>
          <IncidentItem name="Cadelinha atropelada" description="A cadelinha Jolie foi atropelada por um carro no bairro Santana e teve que passar por uma cirurgia às pressas." price="120,00"/>
          <IncidentItem name="Cadelinha atropelada" description="A cadelinha Jolie foi atropelada por um carro no bairro Santana e teve que passar por uma cirurgia às pressas." price="120,00"/>
          <IncidentItem name="Cadelinha atropelada" description="A cadelinha Jolie foi atropelada por um carro no bairro Santana e teve que passar por uma cirurgia às pressas." price="120,00"/>
          <IncidentItem name="Cadelinha atropelada" description="A cadelinha Jolie foi atropelada por um carro no bairro Santana e teve que passar por uma cirurgia às pressas." price="120,00"/>
          <IncidentItem name="Cadelinha atropelada" description="A cadelinha Jolie foi atropelada por um carro no bairro Santana e teve que passar por uma cirurgia às pressas." price="120,00"/>
        </div>
      </div>
    </div>
  );
}
