//#region Imports

import Constants from 'expo-constants';

import { StyleSheet } from 'react-native';

//#endregion

/**
 * Os estilos da página de detalhes do incidente
 */
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    resizeMode: 'contain',
  },
  headerBack: {
    fontWeight: 'bold',
  },
  helpContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 0,
  },
  description: {
    marginVertical: 16,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#E02449',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whatsappButton: {
    marginRight: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },

});
