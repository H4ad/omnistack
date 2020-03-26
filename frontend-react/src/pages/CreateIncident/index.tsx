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
export default function CreateIncident() {
  return (
    <section className="create-incident--container">
      <div className="create-incident--card">
        <div className="create-incident--details">
          <div className="create-incident--logo">
            <img src={ beTheHero } alt="A logo do Be The Hero."/>
          </div>
          <h2>Cadastrar novo caso</h2>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          <div className="create-incident--back">
            <a href="/incidents">
              <FiArrowLeft size={ 18 } color="#E02041"/>
              <span>Voltar para home</span>
            </a>
          </div>
        </div>
        <form className="create-incident--form">
          <input placeholder="Titulo do caso"/>
          <textarea placeholder="Descrição"/>
          <input placeholder="Valor em reais" type="number"/>
          <button>Cadastrar</button>
          <div className="create-incident--back">
            <a href="/incidents">
              <FiArrowLeft size={ 18 } color="#E02041"/>
              <span>Voltar para home</span>
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
