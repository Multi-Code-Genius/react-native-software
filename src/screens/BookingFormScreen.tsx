import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useCreateBooking} from '../api/booking';
import AppHeader from '../components/AppHeader';
import CustomCheckbox from '../components/CustomCheckbox';
import {useTheme} from '../context/ThemeContext';
import {useBookingFormStore} from '../store/useBookingFormStore';
import dayjs from 'dayjs';
import {ScrollView} from 'react-native-gesture-handler';

const BookingFormScreen = () => {
  const route = useRoute();
  const {data} = route.params;
  const [isChecked, setIsChecked] = useState(false);
  const {
    name,
    phone,
    setName,
    setPhone,
    date,
    startTime,
    endTime,
    venueId,
    bookedGrounds,
  } = useBookingFormStore();

  const hourlyprice = data?.venue?.ground_details?.[0].hourly_price;
  const {mutate, isPending} = useCreateBooking();
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const duration = endTime.diff(startTime, 'hour');
  let totalAmount = duration * hourlyprice;
  const handlerBooking = () => {
    mutate({
      phone: phone,
      name: name,
      venueId: venueId,
      date: dayjs(date).add(1, 'day'),
      startTime: startTime,
      endTime: endTime,
      bookedGrounds: bookedGrounds,
      totalAmount: totalAmount,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <AppHeader isApp title="23 may 2025" />
          <View style={styles.container}>
            <View style={styles.form}>
              <View style={styles.card}>
                <Text style={styles.label}>Booking Name</Text>
                <View style={styles.inputWrapper}>
                  <Icon
                    name="person-outline"
                    size={25}
                    color="#717171"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Booking Name"
                    placeholderTextColor="#717171"
                    value={name}
                    returnKeyType="done"
                    onChangeText={setName}
                  />
                </View>
              </View>
              <View style={styles.card}>
                <Text style={styles.label}>Booking Number</Text>
                <View style={styles.inputWrapper}>
                  <Icon
                    name="call-outline"
                    size={25}
                    color="#717171"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Booking Number"
                    placeholderTextColor="#717171"
                    value={phone}
                    keyboardType="numeric"
                    onChangeText={setPhone}
                  />
                </View>
              </View>
              <View style={styles.card}>
                <Text style={styles.label}>Booking Mail</Text>
                <View style={styles.inputWrapper}>
                  <Icon
                    name="mail-outline"
                    size={25}
                    color="#717171"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Booking Mail"
                    placeholderTextColor="#717171"
                  />
                </View>
              </View>
              <View style={styles.card}>
                <View style={styles.checkboxContainer}>
                  <CustomCheckbox
                    checked={isChecked}
                    onToggle={() => setIsChecked(prev => !prev)}
                    label="Send booking notification to user's mobile"
                  />
                </View>
              </View>
            </View>
            <View style={styles.bottomCard}>
              <View style={{flex: 1, gap: 20}}>
                <View
                  style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                  <Text style={styles.text}>Venue 1 , Vesu</Text>
                  <Text style={styles.text1}>( Ground {bookedGrounds})</Text>
                </View>

                <View style={styles.bookingdetail}>
                  <View style={styles.left}>
                    <Text style={styles.title}>Booking Time</Text>
                    <Text style={styles.subTitle}>
                      {startTime.format('h a')} to {endTime.format('h a')}
                    </Text>
                  </View>
                  <View style={styles.separator} />
                  <View style={styles.right}>
                    <Text style={styles.title}>Booking Price</Text>
                    <Text style={styles.subTitle}>₹ {totalAmount}</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                disabled={isPending}
                style={styles.button}
                onPress={() => handlerBooking()}>
                {isPending ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.buttonText}>Book Venue</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default BookingFormScreen;

const getStyles = (theme: any) =>
  StyleSheet.create({
    scrollContent: {
      flexGrow: 1,
      paddingBottom: 30,
    },
    container: {
      backgroundColor: theme.colors.background,
      justifyContent: 'space-between',
    },
    card: {
      padding: 10,
    },
    fixedButtonWrapper: {
      backgroundColor: '#272727',
    },
    label: {
      fontSize: 12,
      marginBottom: 8,
      fontFamily: 'Montserrat-SemiBold',
      color: theme.colors.labeltext,
    },
    form: {
      gap: 15,
      padding: 15,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      backgroundColor: theme.colors.card,
    },
    icon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      fontSize: 14,
      color: theme.colors.text,
      paddingVertical: 20,
      fontFamily: 'Montserrat-Medium',
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    checkboxLabel: {
      color: '#B8B8B8',
      fontSize: 14,
    },
    bottomCard: {
      backgroundColor: theme.colors.card,
      padding: 20,
      justifyContent: 'space-between',
    },
    text: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      fontFamily: 'Montserrat-SemiBold',
    },
    text1: {
      fontSize: 12,
      color: '#888888',
      fontFamily: 'Montserrat-Medium',
    },
    bookingdetail: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: theme.colors.violet,
      marginVertical: 10,
    },
    title: {
      fontSize: 10,
      color: '#CBB2FE',
      fontFamily: 'Montserrat-Medium',
    },
    subTitle: {
      fontSize: 13,
      color: '#FFF',
      fontFamily: 'Montserrat-SemiBold',
    },
    left: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    right: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 34,
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
    separator: {
      width: 1,
      borderRightWidth: 1,
      borderColor: '#bebcbc',
      borderStyle: 'dashed',
      marginHorizontal: 10,
      alignSelf: 'stretch',
    },
  });
