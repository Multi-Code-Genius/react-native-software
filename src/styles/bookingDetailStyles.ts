import {StyleSheet} from 'react-native';

export const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundColor,
    },
    card: {
      flex: 1,
    },
    headerGlow: {
      width: '100%',
      height: '50%',
      flex: 1,
    },
    shadow: {},
    image: {
      width: '100%',
      height: 200,
      borderRadius: 15,
    },
    name1: {
      fontSize: 16,
      fontWeight: '700',
      fontFamily: 'Montserrat-Regular',
      color: theme.colors.text,
    },
    name: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: 'Montserrat-Regular',
      color: '#888888',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    detail: {
      flexDirection: 'row',
      gap: 5,
    },
    tabs: {
      width: '50%',
      alignItems: 'center',
      paddingBottom: 10,
    },
    category: {
      flexDirection: 'row',
      gap: 10,
    },
    tabContainer1: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingVertical: 10,
      backgroundColor: '#f5f5f5',
    },
    tabContainer2: {
      marginTop: 10,
      paddingHorizontal: 10,
    },

    tabs2: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginRight: 10,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#aaa',
      backgroundColor: '#f5f5f5',
    },

    tabActive2: {
      borderColor: '#000',
      backgroundColor: '#fff',
    },

    tabText2: {
      color: '#888',
      fontWeight: '500',
    },

    tabActiveText2: {
      color: '#000',
      fontWeight: 'bold',
    },
    tab: {
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'transparent',
    },

    activeTab: {
      borderColor: '#000',
    },

    tabLabel: {
      fontSize: 14,
      color: '#888',
    },

    activeTabLabel: {
      color: '#000',
      fontWeight: 'bold',
    },

    type: {
      borderColor: theme.colors.labelBorder1,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderWidth: 1,
      borderRadius: 20,
      color: theme.colors.labelBorder1,
      fontFamily: 'Montserrat-Regular',
      fontWeight: 'medium',
      fontSize: 10,
    },
    type1: {
      borderColor: theme.colors.labelBorder2,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderWidth: 1,
      borderRadius: 20,
      color: theme.colors.labelBorder2,
      fontFamily: 'Montserrat-Regular',
      fontWeight: 'medium',
      fontSize: 10,
    },
    venueListContainer: {
      margin: 10,
      padding: 10,
      flex: 1,
      marginBottom: 40,
    },
    tabContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      width: '100%',
      paddingHorizontal: 16,
      paddingTop: 10,
      borderBottomColor: '#B8B8B8',
      // borderBottomWidth: 1,
      marginTop: 20,
    },
    tabText: {
      color: '#888',
      fontSize: 14,
      fontWeight: '600',
      fontFamily: 'Montserrat-Regular',
    },
    tabActive: {
      color: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.text,
      paddingBottom: 10,
    },
    tabActiveText: {
      color: theme.colors.text,
    },
    groundSize: {
      color: '#888',
      fontSize: 10,
      fontFamily: 'Montserrat-Regular',
      fontWeight: 'medium',
    },

    booking: {
      backgroundColor: theme.colors.cardcolor,
      width: '100%',
      flexDirection: 'row',
    },

    right: {
      width: '70%',
      padding: 20,
      gap: 10,
      // backgroundColor: '#191919',
    },
    available: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '70%',
      flexDirection: 'row',
      gap: 5,
    },
    username: {
      color: theme.colors.text,
      fontSize: 14,
      fontWeight: '700',
      fontFamily: 'Montserrat-Regular',
    },
    number: {
      fontSize: 14,
      fontFamily: 'Montserrat-Regular',
      color: '#888888',
      fontWeight: 'medium',
    },
    icon: {
      backgroundColor: '#191919',
      paddingVertical: 7,
      paddingHorizontal: 22,
      width: '50%',
      alignItems: 'center',
    },
    left: {
      width: '30%',
      backgroundColor: '#864A4B',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },

    time: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 14,
      fontFamily: 'Montserrat-Regular',
      marginVertical: 4,
    },

    divider: {
      width: 1,
      height: 80,
      backgroundColor: '#fff',
      marginVertical: 2,
    },
  });
