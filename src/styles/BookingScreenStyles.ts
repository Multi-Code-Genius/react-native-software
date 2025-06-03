import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sheetContent: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  formContainer: {
    gap: 10,
  },

  headerRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  input: {
    marginVertical: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: '#000',
  },
  newcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  dialog: {
    backgroundColor: 'white',
  },
  suggestionBox: {
    position: 'absolute',
    top: -8,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    zIndex: 1000,
    maxHeight: 120,
  },
});
