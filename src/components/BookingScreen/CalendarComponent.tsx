import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  DraggableEvent,
  DraggableEventProps,
  DraggingEvent,
  DraggingEventProps,
  PackedEvent,
  SelectedEventType,
} from '@howljs/calendar-kit';
import React, {useCallback, useState} from 'react';
import {
  useBookingInfo,
  useCancelBooking,
  useCreateBooking,
  useUpdateBooking,
} from '../../api/booking';
import moment from 'moment';
import {customTheme} from './CustomTheme';
import {useToast} from '../../context/ToastContext';
import {useBookingFormStore} from '../../store/useBookingFormStore';
import {calculatedAmount} from '../../hooks/useCalculatedAmount';
import {ImageBackground, View} from 'react-native';
import {TIME_SLOT_ICONS} from '../../constants/TIME_SLOT_ICONS';
import {
  Button,
  Dialog,
  FAB,
  Icon,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import Tooltip from 'react-native-walkthrough-tooltip';
import {styles} from './BookingScreenStyles';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/routes';

type BookingRouteProp = RouteProp<RootStackParamList, 'BookingCalenderScreen'>;

const CalendarComponent = ({navigation, bottomSheetRef}: any) => {
  const route = useRoute<BookingRouteProp>();
  const {venueId, price} = route.params;
  const {showToast} = useToast();
  const {isPending} = useCreateBooking();
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [initialDate, setInitialDate] = useState(moment().format('YYYY-MM-DD'));

  const [selectedEvent, setSelectedEvent] = useState<SelectedEventType | null>(
    null,
  );
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const {data, refetch, isLoading} = useBookingInfo({
    gameId: venueId,
    date: initialDate,
  });
  console.log('data>>', data);
  const theme = useTheme();
  const [visibleTooltipId, setVisibleTooltipId] = useState<string | null>(null);
  const fixEndTime = (timeStr: string): string => {
    if (timeStr.trim().toLowerCase() === '12:00 am') {
      return '11:59 PM';
    }
    return timeStr;
  };
  const {mutate: updateBookingMutate, isPending: updateBookingAPIStatus} =
    useUpdateBooking();

  const {setTotalAmount, setStartTime, setEndTime} = useBookingFormStore();
  const formattedEvents =
    data?.bookings?.map((booking: any) => ({
      id: booking.id,
      title: `Booking by ${booking.customer.name}`,
      start: {dateTime: booking.start_time},
      end: {dateTime: booking.end_time},
      status: booking.status,
      totalAmount: booking.customer.total_amount,
      contact: booking.customer_id,
    })) || [];

  const {mutate: cancelBooking} = useCancelBooking();
  const handleDragStart = (event: any) => {
    console.log('Started editing selected event:', event);
  };

  const handleDragEnd = (event: any) => {
    if (!selectedEvent) {
      return;
    }

    const updatedStartMoment = moment(event.start.dateTime);
    let updatedEndMoment = moment(event.end.dateTime);
    const now = moment();

    if (updatedStartMoment.isBefore(now) || updatedEndMoment.isBefore(now)) {
      showToast({
        message: 'Cannot create/edit event of past time.',
        type: 'error',
      });
      return;
    }

    const updatedStart = updatedStartMoment.format('hh:mm A');

    let updatedEnd = updatedEndMoment.format('hh:mm A');
    updatedEnd = fixEndTime(updatedEnd);

    console.log('look at this=======>', updatedEnd);
    const calculated = calculatedAmount(updatedStart, updatedEnd, price);

    if (calculated) {
      setTotalAmount(calculated);
    }

    const datas = {
      id: event.id,
      data: {
        startTime: updatedStart,
        endTime: updatedEnd,
        date: moment(initialDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
        totalAmount: calculated,
        userId: event.contact,
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
  const handleDragToCreateEvent = (event: any) => {
    const updatedStart = moment(event.start.dateTime);
    let updatedEnd = moment(event.end.dateTime);
    const now = moment();

    if (updatedStart.isBefore(now) || updatedEnd.isBefore(now)) {
      showToast({
        message: 'Cannot create/edit event of past time.',
        type: 'error',
      });
      return;
    }
    setStartTime(moment(event.start.dateTime).format('hh:mm A'));

    // Fix end time if it is 12:00 AM
    let formattedEnd = moment(event.end.dateTime).format('hh:mm A');
    formattedEnd = fixEndTime(formattedEnd);

    setEndTime(formattedEnd);
    bottomSheetRef.current?.expand();
  };

  const renderHour = useCallback(
    ({hourStr}: {hourStr: string}) => {
      const timeSlot = TIME_SLOT_ICONS.find(item => item.time === hourStr);
      return (
        <View style={{flexDirection: 'column', padding: 0}}>
          <Text
            style={{color: '#666666', textAlign: 'right'}}
            variant="labelSmall">
            {hourStr}
          </Text>

          <Text style={{textAlign: 'right'}} variant="bodyLarge">
            {timeSlot?.icon}
          </Text>
        </View>
      );
    },
    [theme.colors.onPrimary],
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
                  setEventToDelete(event.id);
                  setDeleteDialogVisible(true);
                  setVisibleTooltipId(null);
                }}>
                Cancel Booking
              </Button>
            </View>
          }
          placement="top"
          contentStyle={{
            borderRadius: 190,
          }}
          onClose={() => setVisibleTooltipId(null)}>
          <ImageBackground
            source={require('../../assets/eventBG.jpg')}
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
            resizeMode="repeat">
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
  const renderDraggableEvent = useCallback(
    (props: DraggableEventProps) => (
      <DraggableEvent
        {...props}
        renderEvent={renderEvent}
        containerStyle={{
          borderRadius: 10,
          borderWidth: 1,
          padding: 1,
        }}
      />
    ),
    [renderEvent],
  );
  const renderDraggingEvent = useCallback((props: DraggingEventProps) => {
    return (
      <DraggingEvent
        {...props}
        renderEvent={renderEvent}
        containerStyle={{
          borderRadius: 10,
          borderWidth: 1,
          padding: 1,
        }}
      />
    );
  }, []);
  return (
    <View style={styles.container}>
      <CalendarContainer
        isLoading={isPending || isLoading || updateBookingAPIStatus}
        numberOfDays={1}
        events={formattedEvents}
        allowDragToCreate
        scrollByDay
        allowPinchToZoom
        useHaptic
        theme={customTheme}
        start={0}
        end={1439}
        initialDate={initialDate}
        onDateChanged={date =>
          setInitialDate(moment(date).format('YYYY-MM-DD'))
        }
        rightEdgeSpacing={0}
        dragStep={30}
        defaultDuration={60}
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
        <View style={{position: 'relative'}}>
          <CalendarHeader />
        </View>
        <View
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
            renderDraggingEvent={renderDraggingEvent}
          />
        </View>
        {selectedEvent && (
          <FAB
            icon="close"
            label="Close editor"
            customSize={40}
            style={{
              position: 'absolute',
              marginVertical: 10,
              right: 0,
              zIndex: 10000,
            }}
            onPress={() => setSelectedEvent(null)}
          />
        )}
      </CalendarContainer>
      <Portal>
        <Dialog
          visible={deleteDialogVisible}
          onDismiss={() => setDeleteDialogVisible(false)}
          style={styles.dialog}>
          <Dialog.Title>Cancel Booking Confirmation</Dialog.Title>
          <Dialog.Content>
            <Text>
              Are you sure you want to cancel this booking? This action cannot
              be undone.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialogVisible(false)}>
              Keep Booking
            </Button>
            <Button
              onPress={() => {
                if (eventToDelete) {
                  cancelBooking(eventToDelete);
                }
                setDeleteDialogVisible(false);
              }}
              textColor="red">
              Confirm Cancellation
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default CalendarComponent;
