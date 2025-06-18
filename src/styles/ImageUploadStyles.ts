import {StyleSheet} from 'react-native';

export const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      padding: 8,
    },
    heading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    imageGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    head: {
      fontSize: 16,
      paddingVertical: 15,
      borderBottomColor: '#252525',
      borderBottomWidth: 1,
      paddingLeft: 15,
      fontFamily: 'Montserrat-SemiBold',
      color: theme.colors.text,
    },
    imageWrapper: {
      position: 'relative',
      width: '100%',
      padding: 10,
    },
    image: {
      width: '100%',
      padding: 90,
      borderWidth: 1,
      borderColor: 'green',
      borderRadius: 8,
      borderStyle: 'dotted',
    },
    card: {
      padding: 16,
      marginBottom: 16,
      width: '100%',
    },
    label: {
      fontSize: 14,
      marginTop: 8,
      color: theme.colors.labeltext,
      fontFamily: 'Montserrat-SemiBold',
      padding: 10,
    },
    backButton: {
      width: 36,
      height: 36,
      borderRadius: 8,
      backgroundColor: theme.colors.text1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    removeButton: {
      position: 'absolute',
      top: -8,
      right: -8,
      backgroundColor: 'white',
      borderRadius: 12,
      paddingHorizontal: 6,
      paddingVertical: 2,
      elevation: 2,
    },
    removeButtonText: {
      fontSize: 16,
      color: 'red',
      fontWeight: 'bold',
    },
    addButton: {
      width: 80,
      height: 80,
      borderWidth: 1,
      borderStyle: 'dotted',
      borderColor: 'green',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
    },
    plusIcon: {
      fontSize: 24,
      color: 'gray',
    },
  });
