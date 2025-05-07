import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import CalendarKit, {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
} from '@howljs/calendar-kit';
import {Appbar, Icon, Portal, Text, useTheme} from 'react-native-paper';
import {TIME_SLOT_ICONS} from '../constants/TIME_SLOT_ICONS';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

const BookingScreen = () => {
  const theme = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const renderHour = useCallback(({hourStr}: RenderHourProps) => {
    const timeSlot = TIME_SLOT_ICONS.find(item => item.time === hourStr);
    const iconName = timeSlot?.icon;

    return (
      <View
        style={{
          marginLeft: 25,
          gap: 10,
        }}>
        <Text variant="bodySmall">{hourStr}</Text>
        <Text variant="bodyLarge">{iconName}</Text>
      </View>
    );
  }, []);

  const renderBackdrop = useCallback(
    props => (
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

  const handleOpenSheet = event => {
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
        hourWidth={100}
        numberOfDays={1}
        scrollByDay={true}
        scrollToNow={true}
        events={[
          {
            id: '1',
            title: 'Soccer - Rajesh Kumar (Confirmed)',
            start: {dateTime: '2025-05-07T10:00:00Z'},
            end: {dateTime: '2025-05-07T11:00:00Z'},
            description: '7-a-side football, Paid ₹1500, Contact: 9876543210',
            color: '#B7B1F2',
          },
          {
            id: '2',
            title: 'Turf - Preet Pandya (Confirmed)',
            start: {dateTime: '2025-05-07T07:00:00Z'},
            end: {dateTime: '2025-05-07T09:00:00Z'},
            description: '2 turf net, Paid ₹3500, Contact: 8849321658',
            color: '#B7B1F2',
          },
        ]}
        onPressEvent={handleOpenSheet}>
        <CalendarHeader />
        <ScrollView className="flex-1">
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
                <Text variant="titleMedium">{selectedEvent.title}</Text>
                <Text variant="bodyMedium">{selectedEvent.description}</Text>
                <Text variant="bodySmall">
                  From:{' '}
                  {new Date(selectedEvent.start.dateTime).toLocaleTimeString()}
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
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});
