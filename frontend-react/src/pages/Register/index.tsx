//#region Imports

import React from 'react';

import { FiArrowLeft } from 'react-icons/fi';

import beTheHero from '../../assets/logo.svg';

import './styles.css';

//#endregion

/**
 * A função que representa o componente que lida com o registro de usuários
 *
 * @constructor
 */
export default function Register() {
  return (
    <section className="register--container">
      <div className="register--card">
        <div className="register--details">
          <div className="register--logo">
            <img src={ beTheHero } alt="A logo do Be The Hero."/>
          </div>
          <h2>Cadastro</h2>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
          <div className="register--back">
            <a href="/">
              <FiArrowLeft size={ 18 } color="#E02041"/>
              <span>Voltar para o logon</span>
            </a>
          </div>
        </div>
        <form className="register--form">
          <input placeholder="Nome"/>
          <input placeholder="E-mail" type="email"/>
          <input placeholder="Senha" type="password"/>
          <input placeholder="Whatsapp"/>
          <div className="register--form--location">
            <input placeholder="Cidade"/>
            <input placeholder="UF" maxLength={2}/>
          </div>
          <button>Cadastrar</button>
          <div className="register--back">
            <a href="/">
              <FiArrowLeft size={ 18 } color="#E02041"/>
              <span>Voltar para o logon</span>
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
