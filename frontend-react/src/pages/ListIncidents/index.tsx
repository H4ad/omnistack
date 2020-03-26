//#region Imports

import React from 'react';

import { FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import beTheHero from '../../assets/logo.svg';
import IncidentItem from '../../components/IncidentItem';

import './styles.css';

//#endregion

/**
 * O componente que representa a página de listagem de incidentes
 *
 * @constructor
 */
export default function ListIncidents() {
  const history = useHistory();

  /**
   * Método executado quando o usuário quer criar um novo incidente
   */
  function onClickToRegisterIncident() {
    history.push('/incidents/create');
  }

  /**
   * Método executado quando o usuário quer fazer logoff
   */
  function onClickLogoff(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    history.push('/');
  }

  return (
    <div className="list--container">
      <div className="list--header">
        <div className="list--header--texts">
          <div className="list--header--logo">
            <img src={ beTheHero } alt="A logo do Be The Hero."/>
          </div>
          <h2>Bem vinda, APAD</h2>
        </div>
        <div className="list--header--buttons">
          <button onClick={onClickToRegisterIncident}>Cadastrar novo caso</button>
          <a href="/" onClick={onClickLogoff}>
            <FiPower size={ 18 } color="E02041"/>
          </a>
        </div>
      </div>
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
