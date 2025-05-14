import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useRef, useState} from 'react';
import {ImageBackground, Keyboard, View} from 'react-native';
import {Button, FAB, Icon, Text, useTheme} from 'react-native-paper';
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  PackedEvent,
  SelectedEventType,
  DraggableEvent,
} from '@howljs/calendar-kit';
import BookingScreenAppBar from '../components/BookingScreen/BookingScreenAppBar';
import {
  useBookingInfo,
  useCreateBooking,
  useUpdateBooking,
} from '../api/booking';
import {styles} from '../components/BookingScreen/BookingScreenStyles';
import {TIME_SLOT_ICONS} from '../constants/TIME_SLOT_ICONS';
import {useAuthStore} from '../store/authStore';
import {useBookingFormStore} from '../store/useBookingFormStore';

const BookingCalenderScreen = ({navigation}: {navigation: any}) => {
  const theme = useTheme();
  const [initialDate, setInitialDate] = useState(moment().format('DD-MM-YYYY'));
  const [selectedEvent, setSelectedEvent] = useState<SelectedEventType | null>(
    null,
  );
  const route = useRoute();
  const {venueId} = route?.params || {};

  console.log('us', useAuthStore.getState().token);

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
  const {mutate: updateBookingMutate, isPending: updateBookingAPIStatus} =
    useUpdateBooking();

  const formattedEvents = data?.booking.map((booking: any) => ({
    id: booking.id,
    title: booking.user.name,
    start: {dateTime: booking.startTime},
    end: {dateTime: booking.endTime},
    nets: booking.nets,
    status: booking.status,
    totalAmount: booking.totalAmount,
    contact: booking.userMobile,
  }));

  const handleDragToCreateEvent = (event: any) => {
    setStartTime(moment(event.start.dateTime).format('hh:mm A'));
    setEndTime(moment(event.end.dateTime).format('hh:mm A'));
    bottomSheetRef.current?.expand();
  };

  const renderHour = useCallback(({hourStr}: {hourStr: string}) => {
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

  const renderEvent = useCallback(
    (event: PackedEvent) => (
      <ImageBackground
        source={require('../assets/eventBG.jpg')}
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          backgroundColor: '#000',
          flexDirection: 'row',
          borderRadius: 10,
          position: 'relative',
          overflow: 'hidden',
        }}
        imageStyle={{
          opacity: 0.6,
        }}
        resizeMode="cover">
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
          }}>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <Icon source="person" size={20} color={theme.colors.onPrimary} />
            <Text variant="bodyMedium" style={{color: theme.colors.onPrimary}}>
              {event.title}
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <Icon source="time" size={20} color={theme.colors.onPrimary} />
            <Text variant="bodyMedium" style={{color: theme.colors.onPrimary}}>
              {moment(event.start.dateTime).format('h:mm a')} -{' '}
              {moment(event.end.dateTime).format('h:mm a')}
            </Text>
          </View>
        </View>
      </ImageBackground>
    ),
    [],
  );

  const handleDragStart = (event: any) => {
    console.log('Started editing selected event:', event);
  };

  const handleDragEnd = (event: any) => {
    if (!selectedEvent) return;

    console.log(
      'Selected event edited:',
      moment(event.start.dateTime).format('hh:mm A'),
      selectedEvent.id,
    );

    const datas = {
      id: event.id,
      data: {
        startTime: moment(event.start.dateTime).format('hh:mm A'),
        endTime: moment(event.end.dateTime).format('hh:mm A'),
        date: moment(initialDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
      },
    };

    updateBookingMutate(datas, {
      onSuccess: () => {
        refetch();
        setSelectedEvent(null);
      },
      onError: () => {
        setSelectedEvent(null);
      },
    });
  };

  const renderDraggableEvent = useCallback(
    (props: DraggableEventProps) => (
      <DraggableEvent {...props} renderEvent={renderEvent} />
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <BookingScreenAppBar navigation={navigation} />

      <CalendarContainer
        isLoading={isPending || isLoading || updateBookingAPIStatus}
        numberOfDays={1}
        events={formattedEvents}
        allowDragToCreate
        scrollByDay
        allowPinchToZoom
        initialDate={initialDate}
        onDateChanged={date =>
          setInitialDate(moment(date).format('DD-MM-YYYY'))
        }
        dragStep={30}
        hourWidth={100}
        onDragCreateEventEnd={handleDragToCreateEvent}
        allowDragToEdit
        onPressEvent={event =>
          navigation.navigate('bookingDataById', {
            bookingId: event.id,
          })
        }
        onLongPressEvent={(event: any) => setSelectedEvent(event)}
        selectedEvent={selectedEvent}
        onDragSelectedEventStart={handleDragStart}
        onDragSelectedEventEnd={handleDragEnd}>
        <CalendarHeader />
        <CalendarBody
          hourFormat="h:mm a"
          renderHour={renderHour}
          showNowIndicator={false}
          renderEvent={renderEvent}
          renderDraggableEvent={renderDraggableEvent}
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
              <Text variant="bodyLarge">
                Date: {moment(initialDate, 'DD-MM-YYYY').format('Do MM YYYY')}
              </Text>
              <Text variant="bodyLarge">
                Booking for slot: {startTime} - {endTime}
              </Text>
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
      {selectedEvent && (
        <FAB
          icon="close"
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
          }}
          onPress={() => setSelectedEvent(null)}
        />
      )}
    </View>
  );
};

export default BookingCalenderScreen;
