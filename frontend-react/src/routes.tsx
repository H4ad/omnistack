//#region Imports

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CreateIncident from './pages/CreateIncident';
import CreateOng from './pages/CreateOng';
import ListIncidents from './pages/ListIncidents';
import ListOngs from './pages/ListOngs';
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
        <Route exact path="/ongs" component={ListOngs}/>
        <Route path="/ongs/create" component={CreateOng}/>
        <Route exact path="/ongs/:id/incidents" component={ListIncidents}/>
        <Route path="/ongs/:id/incidents/create" component={CreateIncident}/>
      </Switch>
    </BrowserRouter>
  )
}
