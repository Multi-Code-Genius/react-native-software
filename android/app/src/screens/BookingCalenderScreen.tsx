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
import {Appbar, Portal, Text, useTheme} from 'react-native-paper';
import {useBookingInfo} from '../api/booking';
import {TIME_SLOT_ICONS} from '../constants/TIME_SLOT_ICONS';

const BookingScreen = () => {
  const theme = useTheme();

  const route = useRoute();
  const {venueId} = route?.params;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const [date, seDate] = useState(moment().format('DD-MM-YYYY'));

  const {data, refetch, isRefetching} = useBookingInfo({
    gameId: venueId,
    date,
  });
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

  return (
    <View className="flex-1">
      <Appbar.Header
        style={{backgroundColor: theme.colors.primary}}
        statusBarHeight={0}>
        <Appbar.Content color={theme.colors.onPrimary} title="Bookings" />
        <Appbar.Action icon="calendar" color={theme.colors.onPrimary} />
        <Appbar.Action icon="home" color={theme.colors.onPrimary} />
      </Appbar.Header>

      <CalendarContainer
        allowPinchToZoom
        onChange={x => {
          seDate(moment(x).format('DD-MM-YYYY'));
        }}
        hourWidth={100}
        numberOfDays={1}
        scrollByDay={true}
        scrollToNow={true}
        events={mappedEvents}
        onPressEvent={handleOpenSheet}>
        <CalendarHeader />
        <ScrollView
          className="flex-1"
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
                  From:{' '}
                  {new Date(selectedEvent?.start.dateTime).toLocaleTimeString()}
                </Text>
                <Text variant="bodySmall">
                  To:{' '}
                  {new Date(selectedEvent.end.dateTime).toLocaleTimeString()}
                </Text>
              </>
            ) : (
              <Text>Loading event...</Text>
            )}
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});
