import React, {useCallback, useRef} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {Button, Portal, Text, TextInput} from 'react-native-paper';

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
    date: '16-05-2025',
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

    mutate(
      {
        name,
        number,
        startTime,
        endTime,
        totalAmount: parseFloat(amount),
        gameId: venueId,
        nets: 2,
        date: '2025-05-16',
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

  return (
    <View style={styles.container}>
      <BookingScreenAppBar navigation={navigation} />

      <CalendarContainer
        isLoading={isPending || isLoading}
        numberOfDays={1}
        events={formattedEvents}
        allowDragToCreate
        dragStep={30}
        allowDragToEdit
        hourWidth={100}
        onDragCreateEventEnd={handleDragToCreateEvent}>
        <CalendarHeader />
        <ScrollView style={{flex: 1}}>
          <CalendarBody hourFormat="h:mm a" renderHour={renderHour} />
        </ScrollView>
      </CalendarContainer>

      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          keyboardBlurBehavior="restore"
          keyboardBehavior="interactive"
          enablePanDownToClose>
          <BottomSheetView style={styles.sheetContent}>
            <View style={styles.formContainer}>
              <Text>
                Booking for slot: {startTime} - {endTime}
              </Text>
              <TextInput
                label="Name"
                value={name}
                onChangeText={setName}
                mode="outlined"
              />
              <TextInput
                label="Contact"
                value={number}
                onChangeText={setNumber}
                mode="outlined"
              />
              <TextInput
                label="Amount"
                value={amount}
                onChangeText={setAmount}
                mode="outlined"
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
      </Portal>
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
});
