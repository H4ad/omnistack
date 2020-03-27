//#region Imports

import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

//#endregion

/**
 * Os estilos da página de incidentes
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
  },
  logo: {
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 15,
  },
  headerTextNumber: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 48,
    color: '#13131a',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#737380',
  },
  list: {
    marginTop: 16,
  },
});
