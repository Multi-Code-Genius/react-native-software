import {StyleSheet} from 'react-native';
export const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    headerGlow: {
      width: '100%',
      height: '50%',
      flex: 1,
    },
    addvenuebutton: {
      flexDirection: 'row',
      gap: 5,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },

    types: {
      backgroundColor: theme.colors.background,
      width: '90%',
      marginHorizontal: 'auto',
      marginVertical: 15,
      flexDirection: 'row',
      gap: 55,
      paddingVertical: 16,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 15,
    },
    menu: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      padding: 19,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 15,
    },
    type: {
      fontSize: 10,
      fontFamily: 'Montserrat-Regular',
    },
    Head: {
      fontSize: 54,
      fontFamily: 'Montserrat-Regular',
      fontWeight: 'bold',
      letterSpacing: 20,
      textAlign: 'center',
      color: theme.colors.text,
      opacity: 0.1,
    },
    statusItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    bottomtext: {
      color: theme.colors.text,
      fontSize: 14,
      fontFamily: 'Montserrat-Regular',
      fontWeight: '500',
    },
    filterContainer: {
      flexDirection: 'row',
      marginTop: 10,
      gap: 12,
      alignItems: 'center',
      marginHorizontal: 'auto',
    },
    pill: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#191919',
      paddingHorizontal: 19,
      paddingVertical: 8,
      borderRadius: 25,
      gap: 5,
    },
    pillText: {
      color: theme.colors.text,
      fontSize: 12,
      fontFamily: 'Montserrat-Regular',
    },
    sheetContent: {
      padding: 20,
    },
    sheetTitle: {
      color: theme.colors.text,
      fontSize: 16,
      fontFamily: 'Montserrat-SemiBold',
    },
    text: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
    },
    text1: {
      fontSize: 14,
      color: theme.colors.text,
      marginRight: 6,
    },
    addVenueButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#1C1C1E',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    venueCard: {
      backgroundColor: '#1C1C1E',
      padding: 16,
      borderRadius: 6,
      marginTop: 16,
    },
    venueCardSelected: {
      borderColor: '#fff',
      borderWidth: 1,
    },
    venueTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
    },
    venueLocation: {
      fontSize: 13,
      color: '#888',
      marginTop: 4,
    },
    flatlistContainer: {
      height: 40,
      paddingHorizontal: 16,
      marginTop: 10,
    },
  });
