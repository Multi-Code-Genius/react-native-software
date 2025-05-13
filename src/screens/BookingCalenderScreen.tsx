import {StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import BookingScreenAppBar from '../components/BookingScreen/BookingScreenAppBar';
import {useBookingInfo, useCreateBooking} from '../api/booking';
import {useRoute} from '@react-navigation/native';
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
} from '@howljs/calendar-kit';
import moment from 'moment';
import {TIME_SLOT_ICONS} from '../constants/TIME_SLOT_ICONS';
import {Text} from 'react-native-paper';

const BookingCalenderScreen = ({navigation}) => {
  const route = useRoute();
  const {venueId, price} = route?.params;

  const {data, refetch, isLoading, error} = useBookingInfo({
    gameId: venueId,
    date: '15-05-2025',
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
    const startTime = moment(event.start.dateTime).format('hh:mm A');
    const endTime = moment(event.end.dateTime).format('hh:mm A');
    console.log(startTime, endTime);
    const requestBody = {
      startTime: startTime,
      endTime: endTime,
      nets: 2,
      gameId: venueId,
      totalAmount: 2500,
      date: '2025-05-15',
      number: '88493215454',
      name: 'Preet',
    };
    mutate(requestBody, {
      onSuccess: res => {
        refetch();
      },
    });
  };

  const renderHour = useCallback(({hourStr}: RenderHourProps) => {
    const timeSlot = TIME_SLOT_ICONS.find(item => item.time === hourStr);
    const iconName = timeSlot?.icon;

    return (
      <View style={{flexDirection: 'column'}}>
        <Text style={{textAlign: 'right'}} variant="bodySmall">
          {hourStr}
        </Text>
        <Text style={{textAlign: 'right'}} variant="bodyLarge">
          {iconName}
        </Text>
      </View>
    );
  }, []);

  return (
    <View style={{flex: 1}}>
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
        <CalendarBody hourFormat="h:mm a" renderHour={renderHour} />
      </CalendarContainer>
    </View>
  );
};

export default BookingCalenderScreen;

const styles = StyleSheet.create({});
