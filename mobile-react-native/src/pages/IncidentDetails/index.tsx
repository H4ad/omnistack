//#region Imports

import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as MailComposer from 'expo-mail-composer';
import React from 'react';

import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';

import logo from '../../assets/logo.png';

import IncidentItem from '../../components/IncidentItem';
import { IncidentProxy } from '../../models/proxies/incident.proxy';

import styles from './styles';

//#endregion

/**
 * A função que representa a página para você visualizar os detalhes de um incidente
 *
 * @constructor
 */
export default function IncidentDetails() {

  //#region States

  const props = useRoute().params as IncidentProxy;
  const navigation = useNavigation();
  const message = `Olá APAD, estou entrando em contato pois gostaria de ajudar no caso "${ props.title }" com o valor de R$ ${ props.value } reais.`;

  //#endregion

  //#region Methods

  /**
   * Método que é executado ao clicar para voltar
   */
  function onClickBack(): void {
    navigation.goBack();
  }

  /**
   * Método executado quando quer compartilhar pelo whatsapp
   */
  function onClickShareByWhatsapp(): void {
    Linking.openURL(`whatsapp://send?phone=${ props.ong.whatsapp }&text=${ message }`);
  }

  /**
   * Método executado quando quer compartilhar por e-mail
   */
  function onClickShareByEmail(): void {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${ props.title }`,
      recipients: [props.ong.email],
      body: message,
    });
  }

  //#endregion

  return (
    <View style={ styles.container }>
      <View style={ styles.header }>
        <Image style={ styles.logo } source={ logo }/>
        <TouchableOpacity onPress={ onClickBack }>
          <Feather name="arrow-left" size={ 24 } color="#E02449"/>
        </TouchableOpacity>
      </View>
      <IncidentItem { ...props } hideButton={ true }/>
      <View style={ styles.helpContainer }>
        <Text style={ styles.title }>Salve o dia!</Text>
        <Text style={ styles.title }>Seja o heroi desse caso.</Text>
        <Text style={ styles.description }>Entre em contato</Text>
        <View style={ styles.buttonContainer }>
          <TouchableOpacity style={ { ...styles.button, ...styles.whatsappButton } } onPress={ onClickShareByWhatsapp }>
            <Text style={ styles.buttonText }>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.button } onPress={ onClickShareByEmail }>
            <Text style={ styles.buttonText }>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
