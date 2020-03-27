//#region Imports

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { IncidentProxy } from '../../models/proxies/incident.proxy';

import styles from './styles';

//#endregion

/**
 * A função que representa a página para você visualizar as informações de um incidente
 *
 * @constructor
 */
export default function IncidentItem(props: IncidentProxy & { hideButton?: boolean }) {

  //#region States

  const navigation = useNavigation();

  //#endregion

  //#region Methods

  /**
   * Método executado ao clicar para ver os detalhes
   */
  async function onClickDetails(): Promise<void> {
    navigation.navigate('IncidentDetails', { ...props, ong: { ...props.ong } });
  }

  //#endregion

  return (
    <View style={ styles.container }>
      <View style={ styles.row }>
        <View style={ styles.firstColumn }>
          <Text style={ styles.title }>Caso:</Text>
          <Text style={ styles.description }>{ props.title }</Text>
        </View>
        <View style={ styles.secondColumn }>
          <Text style={ styles.title }>Ong:</Text>
          <Text style={ styles.description }>{ props.ong.name }</Text>
        </View>
      </View>
      <View style={ styles.row }>
        <View style={ styles.firstColumn }>
          <Text style={ styles.title }>Valor:</Text>
          <Text style={ styles.description }>R$ { props.value.toFixed(2) } reais</Text>
        </View>
        { props.hideButton && (
          <View style={ styles.secondColumn }>
            <Text style={ styles.title }>Detalhes:</Text>
            <Text style={ styles.description }>{ props.description }</Text>
          </View>
        ) }
      </View>
      { !props.hideButton && (
        <TouchableOpacity onPress={ onClickDetails } style={ styles.details }>
          <Text style={ styles.detailsText }>Ver mais detalhes</Text>
          <Feather name="arrow-right" size={ 16 } color="#E02449"/>
        </TouchableOpacity>
      ) }
    </View>
  );
}
