//#region Imports

import React from 'react';

import { FiLogIn } from 'react-icons/fi';

import heroes from '../../assets/heroes.png';
import beTheHero from '../../assets/logo.svg';

import './styles.css';

//#endregion

/**
 * O componente que representa a página de login
 *
 * @constructor
 */
export default function Logon() {
  return (
    <section className="logon--container">
      <form className="logon--form">
        <div className="logon--form--logo">
          <img src={ beTheHero } alt="A logo do Be The Hero."/>
        </div>
        <div className="logon--form--inputs">
          <h2>Faça seu logon</h2>
          <input placeholder="E-mail" type="email"/>
          <input placeholder="Senha" type="email"/>
          <button>Entrar</button>
          <div className="logon--form--register">
            <a href="/register">
              <FiLogIn size={ 16 } color="#E02041"/>
              <span>Não tenho cadastro</span>
            </a>
          </div>
        </div>
      </form>
      <div className="logon--hero">
        <img src={ heroes } alt="Uma imagem com várias pessoas se abraçando."/>
      </div>
    </section>
  );
}
