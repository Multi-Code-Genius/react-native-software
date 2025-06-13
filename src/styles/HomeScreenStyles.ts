import {StyleSheet} from 'react-native';

export const getStyles = (theme: any) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    performanceCard: {
      borderRadius: 16,
      backgroundColor: theme.colors.card,
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginTop: 16,
    },
    book: {
      width: '100%',
      backgroundColor: theme.colors.success,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 16,
      padding: 10,
      color: theme.colors.text,
    },
    glowWrapper: {
      width: '100%',
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 20,
      backgroundColor: 'transparent',
    },
    analyticsGrid: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 16,
    },
    analyticsBox: {
      width: '100%',
      backgroundColor: theme.colors.card,
      paddingHorizontal: 24,
      paddingVertical: 16,
      gap: 16,
    },
    iconWrap: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
    analyticsValue: {
      fontSize: 32,
      fontWeight: 'semibold',
      color: theme.colors.text,
    },
    analyticsLabel: {
      fontSize: 14,
      fontWeight: 'medium',
      color: theme.colors.textSecondary,
      textAlign: 'left',
      fontFamily: 'Montserrat-Regular',
    },
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    sectionTitle: {
      marginTop: 24,
      marginBottom: 8,
      fontSize: 18,
    },
    heading: {
      fontSize: 12,
      fontWeight: 'bold',
      fontFamily: 'Montserrat-Regular',
      color: theme.colors.textSecondary,
      letterSpacing: 5,
    },
    tabContainer: {
      flexDirection: 'row',
      marginBottom: 16,
      marginTop: 30,
    },
    headcontainer: {
      gap: 15,
    },
    buttoncontainer: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
    Heading1: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    paragraph: {
      fontSize: 15,
      color: theme.colors.text,
    },
    button: {
      width: '40%',
      height: 40,
      backgroundColor: theme.colors.surface,
    },
    add: {
      width: '20%',
    },
    tabButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.border,
      borderRadius: 20,
      marginRight: 8,
    },
    tabButtonActive: {
      backgroundColor: theme.colors.primary,
    },
    tabButtonText: {
      color: theme.colors.text,
      fontWeight: '500',
    },
    tabButtonTextActive: {
      color: theme.colors.background,
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: 18,
      marginBottom: 10,
      padding: 10,
      fontWeight: '700',
      color: theme.colors.text,
    },
    chartCard: {
      marginTop: 20,
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: {width: 0, height: 2},
      elevation: 4,
    },
    barContainer: {
      marginTop: 20,
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: {width: 0, height: 2},
      elevation: 4,
    },
    chartTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 10,
      color: theme.colors.text,
    },
    legendContainer: {
      marginTop: 16,
      flexDirection: 'column',
      alignContent: 'center',
      paddingHorizontal: 30,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    legendDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 8,
    },
    legendLabel: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    headerGlow: {
      width: '100%',
      height: '50%',
    },
    glowBorder: {
      position: 'absolute',
      top: 0,
      width: '80%',
      height: 1,
      alignSelf: 'center',
      zIndex: 2,
    },
    dateButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      paddingVertical: 6,
      paddingHorizontal: 14,
      alignSelf: 'flex-start',
      gap: 6,
    },

    dateText: {
      color: theme.colors.text,
      fontSize: 14,
      fontWeight: '500',
      fontFamily: 'Montserrat-Regular',
    },
    ChartCard: {
      backgroundColor: theme.colors.card,
      padding: 20,
    },
    chartcontainer: {},
    bottomText: {
      fontSize: 50,
      fontWeight: 'medium',
      lineHeight: 55,
      color: theme.colors.text,
      letterSpacing: 3,
      fontFamily: 'ClashGrotesk-Regular',
      opacity: 0.1,
    },
  });
