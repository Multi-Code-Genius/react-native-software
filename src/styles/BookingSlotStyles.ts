import {StyleSheet} from 'react-native';

export const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    card: {
      flex: 1,
    },
    headerGlow: {
      width: '100%',
      height: '50%',
      flex: 1,
    },
    venueListContainer: {
      margin: 10,
      padding: 10,
      marginBottom: 40,
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 15,
    },
    name1: {
      fontSize: 16,
      fontWeight: '600',
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
    },
    detail: {
      flexDirection: 'row',
      gap: 5,
    },
    category: {
      flexDirection: 'row',
      gap: 10,
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
    slotContainer: {
      backgroundColor: theme.colors.card,
      padding: 15,
      gap: 30,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    label: {
      fontSize: 12,
      fontWeight: '600',
      marginBottom: 12,
      color: theme.colors.labeltext,
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
      color: '#888888',
      marginLeft: 8,
    },
    inputWrapper2Selected: {
      borderColor: theme.colors.text,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    inputWrapper2Unselected: {
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    input2Selected: {
      color: theme.colors.text,
    },
    input2Unselected: {
      color: '#898989',
    },
    icon: {
      marginRight: 8,
    },
    button: {
      backgroundColor: theme.colors.primary,
      borderRadius: 0,
      paddingVertical: 20,
      alignItems: 'center',
    },
    buttonText: {
      fontWeight: 'bold',
      color: theme.colors.surface,
    },

    container1: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    block: {
      flex: 1,
    },
    centerBlock: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 25,
    },
    timeBox: {
      backgroundColor: theme.colors.surface,
      paddingVertical: 12,
      paddingHorizontal: 20,
      // borderRadius: 6,
      borderColor: theme.colors.border,
      borderWidth: 1,
    },
    timeText: {
      color: theme.colors.labeltext,
      fontSize: 16,
    },
    duration: {
      color: theme.colors.text,
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalTitle: {
      color: theme.colors.text,
      fontSize: 16,
      marginBottom: 12,
      padding: 16,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    timeSlot: {
      width: '30%',
      marginVertical: 6,
      padding: 12,
      backgroundColor: theme.colors.cardcolor,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    selectedSlot: {
      borderColor: theme.colors.text,
      borderWidth: 1,
    },
    slotText: {
      color: '#B8B8B8',
    },
    selectedSlotText: {
      color: theme.colors.text,
      fontWeight: 'bold',
    },
    bottom: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 15,
      backgroundColor: theme.colors.background,
      paddingVertical: 15,
      marginTop: 10,
    },
    booked: {
      color: '#864A4B',
      fontSize: 12,
      fontFamily: 'Montserrat-Regular',
    },
    selected: {
      color: theme.colors.text,
      fontSize: 12,
      fontFamily: 'Montserrat-Regular',
      fontWeight: '600',
    },
    glowBorder: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: 2,
      alignSelf: 'center',
      zIndex: 2,
    },
    dot: {
      width: 10,
      height: 10,
      backgroundColor: '#864A4B',
      borderRadius: 15,
    },
    dot1: {
      width: 10,
      height: 10,
      backgroundColor: theme.colors.text,
      borderRadius: 15,
    },
    bottomSheetContent: {
      padding: 16,
    },
  });
