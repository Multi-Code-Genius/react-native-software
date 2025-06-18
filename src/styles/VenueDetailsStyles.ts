import {StyleSheet} from 'react-native';

export const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: 10,
    },
    content1: {},
    card: {
      padding: 16,
      marginBottom: 16,
    },
    head: {
      fontSize: 16,
      paddingVertical: 15,
      fontFamily: 'Montserrat-SemiBold',
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
      paddingLeft: 15,
      color: theme.colors.text,
    },
    label: {
      fontSize: 14,
      fontFamily: 'Montserrat-SemiBold',
      marginBottom: 8,
      color: theme.colors.labeltext,
    },
    label1: {
      fontSize: 12,
      color: '#888',
      fontFamily: 'Montserrat-SemiBold',
      paddingBottom: 5,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      backgroundColor: theme.colors.card,
    },
    dropdownWrapper: {
      width: '100%',
    },
    inputWrapper4: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: theme.colors.card,
    },

    icon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      fontSize: 14,
      color: theme.colors.text,
      fontFamily: 'Montserrat-Medium',
      paddingVertical: 20,
    },
    input1: {
      flex: 1,
      fontSize: 14,
      color: theme.colors.surface,
      fontFamily: 'Montserrat-Medium',
      paddingVertical: 20,
    },
    inputWrapper1: {
      flex: 1,
    },
    turfContainer: {
      flexDirection: 'row',
      marginTop: 8,
    },
    turfChip: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#ccc',
      marginRight: 10,
      backgroundColor: '#f0f0f0',
    },
    turfChipSelected: {
      backgroundColor: '#4CAF50',
      borderColor: '#4CAF50',
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    button: {
      flexDirection: 'row',
      backgroundColor: '#007bff',
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      marginHorizontal: 5,
      fontWeight: '600',
    },
    illustration: {
      height: 120,
      width: '100%',
      resizeMode: 'contain',
      marginBottom: 20,
    },

    dropdown: {
      flex: 1,
      backgroundColor: '#272727',
    },

    dropdownContainer: {
      backgroundColor: '#272727',
    },

    dropdownText: {
      fontSize: 16,
      color: '#333',
    },

    dropdownPlaceholder: {
      color: '#999',
    },
    inputWrapper2: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderWidth: 1,
      backgroundColor: '#333',
    },

    input2: {
      fontSize: 16,
      color: theme.colors.timetext,
      marginLeft: 8,
      fontFamily: 'Montserrat-Medium',
    },

    inputWrapper3: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderWidth: 1,
      backgroundColor: '#333',
      width: '33%',
    },

    input3: {
      fontSize: 16,
      color: theme.colors.text,
      textAlign: 'center',
      fontFamily: 'Montserrat-Medium',
    },
    backButton: {
      width: 36,
      height: 36,
      borderRadius: 8,
      backgroundColor: '#B2C000',
      justifyContent: 'center',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
      marginHorizontal: 10,
    },
    inputBox: {
      flex: 1,
      backgroundColor: '#1e1e1e',
      borderColor: '#333',
      borderWidth: 1,
      borderRadius: 4,
      paddingHorizontal: 10,
      marginRight: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputText: {
      color: '#aaa',
      marginLeft: 8,
    },
    head1: {
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: 10,
      fontFamily: 'Montserrat-Medium',
    },
  });
