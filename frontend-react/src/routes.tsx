//#region Imports


import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';

//#endregion

/**
 * O componente que lida com as rotas da aplicação
 *
 * @constructor
 */
export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Logon}/>
        <Route path="/register" component={Logon}/>
      </Switch>
    </BrowserRouter>
  )
}
