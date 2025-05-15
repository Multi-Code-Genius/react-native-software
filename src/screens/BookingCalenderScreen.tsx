import React, {useCallback, useRef, useState} from 'react';
import {ImageBackground, Keyboard, ScrollView, View} from 'react-native';
import {Button, FAB, Icon, Text, useTheme} from 'react-native-paper';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import Tooltip from 'react-native-walkthrough-tooltip';

import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  PackedEvent,
  SelectedEventType,
  DraggableEvent,
  DraggableEventProps,
} from '@howljs/calendar-kit';

import BookingScreenAppBar from '../components/BookingScreen/BookingScreenAppBar';
import {
  useBookingInfo,
  useCancelBooking,
  useCreateBooking,
  useUpdateBooking,
} from '../api/booking';
import {styles} from '../components/BookingScreen/BookingScreenStyles';
import {TIME_SLOT_ICONS} from '../constants/TIME_SLOT_ICONS';
import {useBookingFormStore} from '../store/useBookingFormStore';
import {customTheme} from '../components/BookingScreen/CustomTheme';

interface BookingCalenderScreenProps {
  navigation: any;
}

const BookingCalenderScreen = ({navigation}: BookingCalenderScreenProps) => {
  const theme = useTheme();
  const [initialDate, setInitialDate] = useState(moment().format('DD-MM-YYYY'));
  const [selectedEvent, setSelectedEvent] = useState<SelectedEventType | null>(
    null,
  );
  const [visibleTooltipId, setVisibleTooltipId] = useState<string | null>(null);

  const route = useRoute();
  const {venueId} = route.params as {venueId: string};

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
  const {mutate: cancelBooking} = useCancelBooking();

  const formattedEvents =
    data?.booking?.map((booking: any) => ({
      id: booking.id,
      title: booking.user.name,
      start: {dateTime: booking.startTime},
      end: {dateTime: booking.endTime},
      nets: booking.nets,
      status: booking.status,
      totalAmount: booking.totalAmount,
      contact: booking.userMobile,
    })) || [];

  const handleDragToCreateEvent = (event: any) => {
    setStartTime(moment(event.start.dateTime).format('hh:mm A'));
    setEndTime(moment(event.end.dateTime).format('hh:mm A'));
    bottomSheetRef.current?.expand();
  };

  const renderHour = useCallback(({hourStr}: {hourStr: string}) => {
    const timeSlot = TIME_SLOT_ICONS.find(item => item.time === hourStr);
    return (
      <View style={{flexDirection: 'column'}}>
        <Text
          style={{textAlign: 'right', color: theme.colors.onPrimary}}
          variant="bodySmall">
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
        onError: error => {
          console.error('Booking failed:', error);
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
    (event: PackedEvent) => {
      const isTooltipVisible = visibleTooltipId === event.id;
      return (
        <Tooltip
          disableShadow
          isVisible={isTooltipVisible}
          content={
            <View style={styles.newcontainer}>
              <Button
                mode="text"
                onPress={() => {
                  setSelectedEvent(event);
                  setVisibleTooltipId(null);
                }}>
                Edit
              </Button>
              <Button
                mode="text"
                onPress={() => {
                  Alert.alert(
                    'Confirm',
                    'Are you sure you want to delete this booking?',
                    [
                      {text: 'Cancel', style: 'cancel'},
                      {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: () => {
                          cancelBooking(event.id);
                          setVisibleTooltipId(null);
                        },
                      },
                    ],
                  );
                }}>
                Delete
              </Button>
            </View>
          }
          placement="top"
          onClose={() => setVisibleTooltipId(null)}>
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
            imageStyle={{opacity: 0.6}}
            resizeMode="cover">
            <View
              style={{
                width: '100%',
                flexDirection: 'column',
                gap: 5,
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
              }}>
              <View
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <Icon
                  source="person"
                  size={20}
                  color={theme.colors.onPrimary}
                />
                <Text
                  variant="bodyMedium"
                  style={{color: theme.colors.onPrimary}}>
                  {event.title}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <Icon source="time" size={20} color={theme.colors.onPrimary} />
                <Text
                  variant="bodyMedium"
                  style={{color: theme.colors.onPrimary}}>
                  {moment(event.start.dateTime).format('h:mm a')} -{' '}
                  {moment(event.end.dateTime).format('h:mm a')}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </Tooltip>
      );
    },
    [visibleTooltipId, theme.colors.onPrimary],
  );

  const handleDragStart = (event: any) => {
    console.log('Started editing selected event:', event);
  };

  const handleDragEnd = (event: any) => {
    if (!selectedEvent) return;

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
      onError: error => {
        console.error('Update failed:', error);
        setSelectedEvent(null);
      },
    });
  };

  const renderDraggableEvent = useCallback(
    (props: DraggableEventProps) => (
      <DraggableEvent {...props} renderEvent={renderEvent} />
    ),
    [renderEvent],
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
        useHaptic={true}
        rightEdgeSpacing={0}
        theme={customTheme}
        initialDate={initialDate}
        onDateChanged={date =>
          setInitialDate(moment(date).format('DD-MM-YYYY'))
        }
        dragStep={30}
        allowDragToEdit={!!selectedEvent}
        hourWidth={100}
        onDragCreateEventEnd={handleDragToCreateEvent}
        onPressEvent={event =>
          navigation.navigate('bookingDataById', {
            bookingId: event.id,
          })
        }
        onLongPressEvent={event => setVisibleTooltipId(event.id)}
        selectedEvent={selectedEvent}
        onDragSelectedEventStart={handleDragStart}
        onDragSelectedEventEnd={handleDragEnd}>
        <CalendarHeader />
        <ScrollView
          style={{flex: 1}}
          pointerEvents={
            isLoading || isPending || updateBookingAPIStatus ? 'none' : 'auto'
          }>
          <CalendarBody
            hourFormat="h:mm a"
            renderHour={renderHour}
            showNowIndicator={true}
            renderEvent={renderEvent}
            renderDraggableEvent={renderDraggableEvent}
          />
        </ScrollView>
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
