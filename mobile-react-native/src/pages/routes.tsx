//#region Imports

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import IncidentDetails from './IncidentDetails';
import Incidents from './Incidents';

//#endregion

const AppStack = createStackNavigator();

/**
 * A função que representa o componente que contém as rotas da aplicação
 *
 * @constructor
 */
export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Incidents" component={ Incidents }/>
        <AppStack.Screen name="IncidentDetails" component={ IncidentDetails }/>
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
