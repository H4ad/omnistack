//#region Imports

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';

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
        <Route exact path="/">
          <Logon/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
