import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  RenderHourProps,
} from '@howljs/calendar-kit';
import {useRoute} from '@react-navigation/native';
import debounce from 'lodash.debounce';
import moment from 'moment';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {
  Appbar,
  Icon,
  IconButton,
  Portal,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {useBookingInfo, useCreateBooking} from '../api/booking';
import {TIME_SLOT_ICONS} from '../constants/TIME_SLOT_ICONS';
import ModalForm from '../components/ModalForm';
import DatePicker from 'react-native-date-picker';

const BookingCalenderScreen = ({navigation}) => {
  const theme = useTheme();

  const route = useRoute();
  const {venueId} = route?.params;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const calendarRef = useRef(null);
  const [date, setDate] = useState(moment().format('DD-MM-YYYY'));
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [visible, setVisible] = useState(false);

  const {data, refetch, isRefetching, isLoading} = useBookingInfo({
    gameId: venueId,
    date,
  });

  const {mutate} = useCreateBooking();

  const debouncedRefetch = useMemo(
    () =>
      debounce(() => {
        if (!isRefetching) {
          refetch();
        }
      }, 500),
    [refetch],
  );

  useEffect(() => {
    debouncedRefetch();

    return () => {
      debouncedRefetch.cancel();
    };
  }, [date, debouncedRefetch]);

  const handleCreateBooking = (formData: any) => {
    formData.gameId = venueId;
    mutate(formData, {
      onSuccess: res => {
        if (res?.booking) {
          const {date: resDate} = res?.booking;

          const formattedDate = moment(resDate).format('DD-MM-YYYY');
          setDate(formattedDate);
        }
      },
      onError: err => {
        console.error('Booking creation failed', err);
      },
    });
  };

  const mappedEvents = data
    ? (data || [])?.booking.map((item: any) => ({
        id: item?.id,
        title: `${item?.nets > 1 ? 'Turf' : 'Soccer'} - ${item.user?.name} (${
          item?.status
        })`,
        start: {dateTime: item?.startTime},
        end: {dateTime: item?.endTime},
        description: `${item?.nets} turf net, ₹${item?.totalAmount}, Contact: ${item?.userMobile}`,
        color: '#B7B1F2',
      }))
    : [];

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const renderHour = useCallback(({hourStr}: RenderHourProps) => {
    const timeSlot = TIME_SLOT_ICONS.find(item => item.time === hourStr);
    const iconName = timeSlot?.icon;

    return (
      <View style={{marginLeft: 25, gap: 10}}>
        <Text variant="bodySmall">{hourStr}</Text>
        <Text variant="bodyLarge">{iconName}</Text>
      </View>
    );
  }, []);

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

  const snapPoints = ['25%', '50%'];

  const handleOpenSheet = (event: any) => {
    setSelectedEvent(event);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
    setDate(moment(newDate).format('DD-MM-YYYY'));
    calendarRef.current?.goToDate(newDate);
  };

  const handleOpenDatePicker = () => {
    setDatePickerVisible(true);
  };

  return (
    <View style={{flex: 1}}>
      <View>
        <Appbar.Header
          style={{backgroundColor: theme.colors.primary}}
          statusBarHeight={0}>
          <IconButton
            icon="arrow-back"
            iconColor={theme.colors.onPrimary}
            onPress={() => navigation.goBack()}
          />
          <Appbar.Content
            title="Bookings"
            titleStyle={{color: theme.colors.onPrimary}}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconButton
              icon="calendar"
              iconColor={theme.colors.onPrimary}
              onPress={handleOpenDatePicker}
            />
            <Appbar.Action
              icon="add-circle"
              color={theme.colors.onPrimary}
              onPress={() => setVisible(true)}
            />
          </View>
        </Appbar.Header>
      </View>
      <CalendarContainer
        key={date}
        ref={calendarRef}
        isLoading={isLoading}
        allowPinchToZoom
        onChange={x => {
          setDate(moment(x).format('DD-MM-YYYY'));
          setSelectedDate(new Date(x));
        }}
        initialDate={selectedDate}
        hourWidth={100}
        scrollToNow={false}
        numberOfDays={1}
        scrollByDay={true}
        events={mappedEvents}
        onPressEvent={handleOpenSheet}
        animateColumnWidth>
        <CalendarHeader />

        <ScrollView
          style={{flex: 1}}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
          }>
          <CalendarBody
            showNowIndicator={false}
            renderHour={renderHour}
            hourFormat="h:mm a"
          />
        </ScrollView>
      </CalendarContainer>

      {/* Date Picker Modal */}
      <Portal>
        <DatePicker
          modal
          open={datePickerVisible}
          date={selectedDate}
          mode="date"
          onConfirm={date => {
            setDatePickerVisible(false);
            handleDateChange(date);
          }}
          onCancel={() => {
            setDatePickerVisible(false);
          }}
        />
      </Portal>

      {/* Event Details Bottom Sheet */}
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          enablePanDownToClose={true}
          onChange={index => {
            if (index === -1) {
              setSelectedEvent(null);
            }
          }}
          enableDynamicSizing={true}>
          <BottomSheetView style={styles.contentContainer}>
            {selectedEvent ? (
              <>
                <Text variant="titleMedium">{selectedEvent?.title}</Text>
                <Text variant="bodyMedium">{selectedEvent?.description}</Text>
                <Text variant="bodySmall">
                  From:
                  {new Date(selectedEvent?.start.dateTime).toLocaleTimeString()}
                </Text>
                <Text variant="bodySmall">
                  To:
                  {new Date(selectedEvent.end.dateTime).toLocaleTimeString()}
                </Text>
              </>
            ) : (
              <Text>Loading event...</Text>
            )}
          </BottomSheetView>
        </BottomSheet>
      </Portal>

      <ModalForm
        visible={visible}
        onDismiss={() => setVisible(false)}
        onSubmit={handleCreateBooking}
      />
    </View>
  );
};

export default BookingCalenderScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});
