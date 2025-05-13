import React, {useCallback, useRef, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {Button, Portal, Text, TextInput, useTheme} from 'react-native-paper';

import BookingScreenAppBar from '../components/BookingScreen/BookingScreenAppBar';
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
} from '@howljs/calendar-kit';

import {useBookingInfo, useCreateBooking} from '../api/booking';
import {TIME_SLOT_ICONS} from '../constants/TIME_SLOT_ICONS';
import {useBookingFormStore} from '../store/useBookingFormStore';

const BookingCalenderScreen = ({navigation}) => {
  const theme = useTheme();
  const [initialDate, setInitialDate] = useState(moment().format('DD-MM-YYYY'));
  const route = useRoute();
  const {venueId, price} = route?.params || {};

  const {
    name,
    number,
    amount,
    startTime,
    endTime,
    setName,
    setNumber,
    setAmount,
    setStartTime,
    setEndTime,
    resetForm,
  } = useBookingFormStore();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['50%'];

  const {data, refetch, isLoading} = useBookingInfo({
    gameId: venueId,
    date: initialDate,
  });

  const {mutate, isPending} = useCreateBooking();

  const formattedEvents = data?.booking.map(booking => ({
    id: booking.id,
    title: booking.user.name,
    start: {dateTime: booking.startTime},
    end: {dateTime: booking.endTime},
    color: '#4285F4',
  }));

  const handleDragToCreateEvent = event => {
    setStartTime(moment(event.start.dateTime).format('hh:mm A'));
    setEndTime(moment(event.end.dateTime).format('hh:mm A'));
    bottomSheetRef.current?.expand();
  };

  const renderHour = useCallback(({hourStr}) => {
    const timeSlot = TIME_SLOT_ICONS.find(item => item.time === hourStr);
    return (
      <View style={{flexDirection: 'column'}}>
        <Text style={{textAlign: 'right'}} variant="bodySmall">
          {hourStr}
        </Text>
        <Text style={{textAlign: 'right'}} variant="bodyLarge">
          {timeSlot?.icon}
        </Text>
      </View>
    );
  }, []);

  const handleBookingSubmit = () => {
    if (!name || !number || !amount || !startTime || !endTime) {
      console.warn('Please fill in all fields and select a time slot.');
      return;
    }
    console.log('name', name);
    Keyboard.dismiss();
    mutate(
      {
        name,
        number,
        startTime,
        endTime,
        totalAmount: parseFloat(amount),
        gameId: venueId,
        nets: 2,
        date: moment(initialDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
      },
      {
        onSuccess: () => {
          refetch();
          resetForm();
          bottomSheetRef.current?.close();
        },
      },
    );
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  );

  console.log('formattedEvents', formattedEvents);

  return (
    <View style={styles.container}>
      <BookingScreenAppBar navigation={navigation} />

      <CalendarContainer
        isLoading={isPending || isLoading}
        numberOfDays={1}
        events={formattedEvents}
        allowDragToCreate
        scrollByDay
        initialDate={initialDate}
        onDateChanged={date =>
          setInitialDate(moment(date).format('DD-MM-YYYY'))
        }
        dragStep={30}
        hourWidth={100}
        onDragCreateEventEnd={handleDragToCreateEvent}>
        <CalendarHeader />
        <CalendarBody
          hourFormat="h:mm a"
          renderHour={renderHour}
          showNowIndicator={false}
        />
      </CalendarContainer>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        keyboardBehavior="fillParent"
        enableDynamicSizing={false}
        backdropComponent={renderBackdrop}>
        <BottomSheetView style={styles.sheetContent}>
          <View style={styles.formContainer}>
            <View style={styles.headerRow}>
              <Text>
                Booking for slot: {startTime} - {endTime}
              </Text>
              <Text>Date: {initialDate}</Text>
            </View>

            <BottomSheetTextInput
              placeholderTextColor="#888"
              placeholder="Full Name (e.g., John Doe)"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <BottomSheetTextInput
              placeholderTextColor="#888"
              placeholder="Phone Number (e.g., +1 234 567 890)"
              value={number}
              onChangeText={setNumber}
              keyboardType="phone-pad"
              style={styles.input}
            />
            <BottomSheetTextInput
              placeholderTextColor="#888"
              placeholder="Amount (e.g., 250.00)"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleBookingSubmit}
              loading={isPending}>
              Book Slot
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default BookingCalenderScreen;

const styles = StyleSheet.create({
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
  buttonContainer: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
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
});
