//#region Imports

import React, { useState } from 'react';

import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import beTheHero from '../../assets/logo.svg';

import { CreateOngPayload } from '../../models/payloads/create-ong.payload';
import { createOng } from '../../services/api';
import './styles.css';

//#endregion

/**
 * A função que representa o componente que lida com o registro de ongs
 *
 * @constructor
 */
export default function CreateOng() {

  //#region States

  const history = useHistory();
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  //#endregion

  //#region Methods

  /**
   * Método chamado quando o formulário é enviado
   *
   * @param event As informações do evento de envio de formulário
   */
  async function onSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    const ongPayload: CreateOngPayload = {
      city,
      name,
      uf: uf.toLocaleUpperCase(),
      whatsapp,
    };

    if (!ongPayload.name)
      return void setError('É necessário digitar o nome da ong.');

    const ongResponse = await createOng(ongPayload);

    if (typeof ongResponse === 'string')
      return void setError(ongResponse);

    history.push('/incidents');
  }

  //#endregion

  return (
    <section className="register--container">
      <div className="register--card">
        <div className="register--details">
          <div className="register--logo">
            <img src={ beTheHero } alt="A logo do Be The Hero."/>
          </div>
          <h2>Cadastrar uma ong</h2>
          <p>Crie sua ong, dessa forma, você poderá cadastrar casos para que as pessoas te ajudem.</p>
          <div className="register--back">
            <a href="/">
              <FiArrowLeft size={ 18 } color="#E02041"/>
              <span>Voltar para o logon</span>
            </a>
          </div>
        </div>
        <form noValidate={true} onSubmit={onSubmit} className="register--form">
          <h3 className="form--error">{ error }</h3>
          <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)}/>
          <input placeholder="Whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)}/>
          <div className="register--form--location">
            <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)}/>
            <input placeholder="UF" maxLength={2} value={uf} onChange={e => setUf(e.target.value)}/>
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
