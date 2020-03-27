//#region Imports

import { StyleSheet } from 'react-native';

//#endregion

/**
 * Os estilos do item de incidente
 */
export default StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  firstColumn: {
    width: '60%',
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  secondColumn: {
    width: '40%',
    paddingVertical: 8,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 24,
  },
  detailsText: {
    color: '#E02449',
  },
});
