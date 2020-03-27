//#region Imports

import React, { useEffect, useState } from 'react';

import { FlatList, Image, Text, View } from 'react-native';

import logo from '../../assets/logo.png';

import IncidentItem from '../../components/IncidentItem';
import { IncidentProxy } from '../../models/proxies/incident.proxy';
import { getIncidents } from '../../services/api';

import styles from './styles';

//#endregion

/**
 * A função que representa a página que lista os incidentes
 *
 * @constructor
 */
export default function Incidents() {

  //#region States

  const [error, setError] = useState('');
  const [listIncidents, setListIncidents] = useState<IncidentProxy[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  //#endregion

  //#region Methods

  /**
   * Método que carrega os incidentes
   */
  async function loadIncidents(): Promise<void> {
    if (loading)
      return;

    if (total > 0 && listIncidents.length === total)
      return;

    setLoading(true);

    const response = await getIncidents(10, page);

    setLoading(false);

    if (typeof response === 'string')
      return void setError(response);

    const [totalIncidents, incidents] = response;

    setTotal(totalIncidents);
    setPage(page + 1);
    setListIncidents([...listIncidents, ...incidents]);
  }

  //#endregion

  //#region Effects

  useEffect(() => {
    loadIncidents();
  }, []);

  //#endregion

  return (
    <View style={ styles.container }>
      <View style={ styles.header }>
        <Image style={ styles.logo } source={ logo }/>
        <Text style={ styles.headerText }>
          Total de <Text style={ styles.headerTextNumber }>{ total }</Text> casos.
        </Text>
      </View>
      <Text style={ styles.title }>Bem-vindo!</Text>
      <Text style={ styles.description }>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList style={ styles.list }
                data={ listIncidents }
                showsVerticalScrollIndicator={ false }
                onEndReached={ loadIncidents }
                onEndReachedThreshold={ .2 }
                keyExtractor={ (incident) => String(incident.id) }
                renderItem={ incident => (<IncidentItem { ...incident.item } hideButton={ false }/>) }/>
    </View>
  );
}
