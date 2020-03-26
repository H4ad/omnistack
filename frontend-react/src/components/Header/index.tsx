//#region Imports

import React from 'react';

import { FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import beTheHero from '../../assets/logo.svg';
import { KeysEnum } from '../../models/enums/keys.enum';
import { UserProxy } from '../../models/proxies/user.proxy';

import { HeaderProps } from './header.props';

import './style.css';

//#endregion

/**
 * A funçao que representa o componente que representa o header da aplicação
 *
 * @constructor
 */
export default function Header({ actionButtonText, actionRoute }: HeaderProps) {

  //#region States

  const history = useHistory();
  const userJson = localStorage.getItem(KeysEnum.USER_PROXY);

  if (!userJson) {
    history.push('/');

    return (<></>);
  }

  const userInfo = JSON.parse(userJson) as UserProxy;

  //#endregion

  //#region Methods

  /**
   * Método executado quando o usuário quer realizar uma ação
   */
  function onClickToAction() {
    history.push(actionRoute);
  }

  /**
   * Método executado quando o usuário quer fazer logoff
   */
  function onClickLogoff(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    history.push('/');
  }

  //#endregion

  return (
    <div className="header">
      <div className="header--texts">
        <div className="header--logo">
          <img src={ beTheHero } alt="A logo do Be The Hero."/>
        </div>
        <h2>Bem vindo (a), { userInfo.email }</h2>
      </div>
      <div className="header--buttons">
        <button onClick={ onClickToAction }>{ actionButtonText }</button>
        <a href="/" onClick={ onClickLogoff }>
          <FiPower size={ 18 } color="E02041"/>
        </a>
      </div>
    </div>
  );
}
