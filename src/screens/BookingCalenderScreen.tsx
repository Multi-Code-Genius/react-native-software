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
import DatePicker from 'react-native-date-picker';
import {
  ActivityIndicator,
  Appbar,
  Badge,
  Button,
  Chip,
  FAB,
  Icon,
  IconButton,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  useBookingInfo,
  useCancelBooking,
  useCreateBooking,
} from '../api/booking';
import ModalForm from '../components/ModalForm';
import {TIME_SLOT_ICONS} from '../constants/TIME_SLOT_ICONS';

const BookingCalenderScreen = ({navigation}) => {
  const route = useRoute();
  const {venueId} = route?.params;

  const bottomSheetRef = useRef<BottomSheet>(null);
  const calendarRef = useRef(null);

  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [date, setDate] = useState(moment().format('DD-MM-YYYY'));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [forceCalendarReset, setForceCalendarReset] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [formDefaults, setFormDefaults] = useState<any>(null);

  const {data, refetch, isRefetching, isLoading} = useBookingInfo({
    gameId: venueId,
    date,
  });

  const {mutate} = useCreateBooking();
  const {mutate: cancelBookingMutation, isPending} = useCancelBooking();
  const theme = useTheme();

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
          const formattedDate = moment(res.booking.date).format('DD-MM-YYYY');
          setDate(formattedDate);

          refetch();
        }
      },
      onError: err => {
        console.error('Booking creation failed', err);
      },
    });
  };

  const handleModalSubmit = (data: any) => {
    if (modalMode === 'edit') {
      console.log('Edited booking data:', data);
    } else {
      handleCreateBooking(data);
    }
  };

  const handleCancelBooking = (bookingId: any) => {
    cancelBookingMutation(bookingId, {
      onSuccess: () => {
        bottomSheetRef.current?.close();
      },
      onError: err => {
        console.error('Cancel booking failed', err);
      },
    });
  };

  const mappedEvents =
    data?.booking?.map((item: any) => ({
      id: item?.id,
      title: `${item?.nets > 1 ? 'Turf' : 'Soccer'} - ${item?.user?.name}`,
      status: item?.status,
      start: {dateTime: item?.startTime},
      end: {dateTime: item?.endTime},
      totalAmount: item?.totalAmount,
      net: item?.nets,
      contact: item?.userMobile,
    })) || [];

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

  const snapPoints = ['50%', '75%'];

  const handleOpenSheet = (event: any) => {
    setSelectedEvent(event);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
    setDate(moment(newDate).format('DD-MM-YYYY'));
    setForceCalendarReset(true);
    // calendarRef.current?.goToDate(newDate);
  };

  const handleOpenDatePicker = () => {
    setDatePickerVisible(true);
  };

  const renderEvent = useCallback((event: PackedEvent) => {
    const startTime = moment(event.start.dateTime);
    const endTime = moment(event.end.dateTime);
    const duration = moment.duration(endTime.diff(startTime)).asHours();

    const isOneHour = duration === 1;

    if (isOneHour) {
      return (
        <View
          style={{
            backgroundColor: '#EFFDF4',
            flex: 1,
            width: '100%',
            height: '100%',
            padding: 12,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#BAF7D0',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 8,
          }}>
          <Text variant="titleMedium">{event.title}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
            <Icon source="time-outline" size={20} />
            <Text>
              {startTime.format('h:mm A')} - {endTime.format('h:mm A')}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View
        style={{
          backgroundColor: '#EFFDF4',
          flex: 1,
          width: '100%',
          height: '100%',
          padding: 12,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#BAF7D0',
          flexDirection: 'column',
          gap: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
          }}>
          <Text variant="titleMedium" style={{flexShrink: 1}}>
            {event.title}
          </Text>
          <Chip
            icon="wallet-outline"
            mode="outlined"
            style={{backgroundColor: '#DCFCE7', borderColor: '#EFFDF4'}}>
            {event.status}
          </Chip>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 8,
          }}>
          <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
            <Icon source="basketball-outline" size={20} />
            <Text>{event.net}</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
            <Icon source="cash-outline" size={20} />
            <Text>{event.totalAmount}</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
            <Icon source="call-outline" size={20} />
            <Text>{event.contact}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            marginTop: 4,
          }}>
          <Icon source="time-outline" size={20} />
          <Text>
            {startTime.format('h:mm A')} - {endTime.format('h:mm A')}
          </Text>
        </View>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <View style={{flex: 1}}>
        <View>
          <Appbar.Header
            style={{
              backgroundColor: 'white',
              borderBottomColor: '#e0e0e0',
              borderBottomWidth: 2,
            }}
            statusBarHeight={0}>
            <IconButton
              icon="arrow-back"
              iconColor={'black'}
              onPress={() => navigation.goBack()}
            />
            <Appbar.Content title="Bookings" titleStyle={{color: 'black'}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <IconButton
                icon="calendar"
                iconColor="black"
                onPress={handleOpenDatePicker}
              />
              <Appbar.Action
                icon="add-circle"
                color="black"
                onPress={() => {
                  setModalMode('add');
                  setFormDefaults(null);
                  setVisible(true);
                }}
              />
            </View>
          </Appbar.Header>
        </View>
        <CalendarContainer
          key={forceCalendarReset ? selectedDate.toISOString() : undefined}
          ref={calendarRef}
          isLoading={isLoading}
          allowPinchToZoom
          onChange={x => {
            setDate(moment(x).format('DD-MM-YYYY'));
            setSelectedDate(new Date(x));
            setForceCalendarReset(false);
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
          <FAB
            style={[styles.fab, {backgroundColor: '#DCFCE7'}]}
            mode="flat"
            variant="surface"
            animated
            label={`${data?.booking.length || 0} Total Bookings`}
            loading={isLoading}
          />
          <ScrollView
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
            }>
            <CalendarBody
              showNowIndicator={false}
              renderHour={renderHour}
              hourFormat="h:mm a"
              renderEvent={renderEvent}
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
            <BottomSheetView style={styles.sheetContent}>
              {selectedEvent ? (
                <View style={styles.sheetCard}>
                  <Text variant="titleLarge" style={styles.sheetTitle}>
                    {selectedEvent?.title}
                  </Text>

                  <View style={styles.sheetRow}>
                    <Icon source="wallet-outline" size={20} />
                    <Text style={styles.sheetText}>
                      Status: {selectedEvent?.status}
                    </Text>
                  </View>

                  <View style={styles.sheetRow}>
                    <Icon source="calendar-outline" size={20} />
                    <Text style={styles.sheetText}>
                      {moment(selectedEvent.start.dateTime).format(
                        'DD MMM YYYY',
                      )}
                    </Text>
                  </View>

                  <View style={styles.sheetRow}>
                    <Icon source="time-outline" size={20} />
                    <Text style={styles.sheetText}>
                      {moment(selectedEvent?.start.dateTime).format('h:mm A')} -{' '}
                      {moment(selectedEvent.end.dateTime).format('h:mm A')}
                    </Text>
                  </View>

                  <View style={styles.sheetRow}>
                    <Icon source="cash-outline" size={20} />
                    <Text style={styles.sheetText}>
                      Amount: ₹{selectedEvent?.totalAmount}
                    </Text>
                  </View>

                  <View style={styles.sheetRow}>
                    <Icon source="call-outline" size={20} />
                    <Text style={styles.sheetText}>
                      Contact: {selectedEvent?.contact}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 5,
                      marginTop: 20,
                    }}>
                    <Button
                      style={{
                        width: '50%',
                        borderRadius: 8,
                      }}
                      icon="ban"
                      mode="text"
                      loading={isPending}
                      onPress={() => handleCancelBooking(selectedEvent.id)}>
                      Cancel Booking
                    </Button>
                    <Button
                      style={{width: '50%', borderRadius: 8}}
                      icon="pencil"
                      mode="contained"
                      onPress={() => {
                        setModalMode('edit');
                        setFormDefaults({
                          name: selectedEvent?.title?.split(' - ')[1] || '',
                          number: selectedEvent?.contact || '',
                          date: moment(selectedEvent?.start.dateTime).format(
                            'YYYY-MM-DD',
                          ),
                          startTime: moment(
                            selectedEvent?.start.dateTime,
                          ).format('hh:mm A'),
                          endTime: moment(selectedEvent?.end.dateTime).format(
                            'hh:mm A',
                          ),
                          nets: selectedEvent?.net,
                          totalAmount: selectedEvent?.totalAmount,
                        });
                        setVisible(true);
                        bottomSheetRef.current?.close();
                      }}>
                      Edit booking info
                    </Button>
                  </View>
                </View>
              ) : (
                <ActivityIndicator animating />
              )}
            </BottomSheetView>
          </BottomSheet>
        </Portal>

        <ModalForm
          visible={visible}
          onDismiss={() => setVisible(false)}
          onSubmit={handleModalSubmit}
          mode={modalMode}
          defaultValues={formDefaults}
        />
      </View>
    </SafeAreaView>
  );
};

export default BookingCalenderScreen;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
    flex: 1,
  },

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
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  fab: {
    position: 'absolute',
    marginHorizontal: 10,
    marginVertical: 1,
    right: 0,
    top: 0,
    zIndex: 999999999,
  },

  sheetContent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
  },

  sheetCard: {
    // backgroundColor: '#ffffff',
    borderRadius: 16,

    width: '100%',
    gap: 12,
  },

  sheetTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },

  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  sheetText: {
    fontSize: 14,
    color: '#333',
  },
});
