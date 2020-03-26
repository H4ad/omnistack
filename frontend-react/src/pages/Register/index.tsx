//#region Imports

import React, { useState } from 'react';

import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import beTheHero from '../../assets/logo.svg';

import { CreateUserPayload } from '../../models/payloads/create-user.payload';
import { LoginPayload } from '../../models/payloads/login.payload';
import { auth, createUser } from '../../services/api';

import './styles.css';

//#endregion

/**
 * A função que representa o componente que lida com o registro de usuários
 *
 * @constructor
 */
export default function Register() {

  //#region States

  const history = useHistory();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //#endregion

  //#region Methods

  /**
   * Método chamado quando o formulário é enviado
   *
   * @param event As informações do evento de envio de formulário
   */
  async function onSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    const userPayload: CreateUserPayload = {
      email,
      password,
    };

    if(!userPayload.password || !userPayload.email)
      return void setError('É necessário digitar um e-mail e uma senha válida.');

    const userResponse = await createUser(userPayload);

    if (typeof userResponse === 'string')
      return void setError(userResponse);

    const loginPayload: LoginPayload = {
      username: email,
      password,
    };

    const authResponse = await auth(loginPayload);

    if (typeof authResponse === 'string')
      return void setError(authResponse);

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
          <h2>Cadastro</h2>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
          <div className="register--back">
            <a href="/">
              <FiArrowLeft size={ 18 } color="#E02041"/>
              <span>Voltar para o logon</span>
            </a>
          </div>
        </div>
        <form noValidate={true} onSubmit={onSubmit} className="register--form">
          <h3 className="form--error">{ error }</h3>
          <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
          <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
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
