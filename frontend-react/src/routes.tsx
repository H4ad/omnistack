//#region Imports

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CreateIncident from './pages/CreateIncident';
import ListIncidents from './pages/ListIncidents';
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
        <Route exact path="/" component={Logon}/>
        <Route path="/register" component={Register}/>
        <Route exact path="/incidents" component={ListIncidents}/>
        <Route path="/incidents/create" component={CreateIncident}/>
      </Switch>
    </BrowserRouter>
  )
}
