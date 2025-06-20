import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppHeader from '../components/AppHeader';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import DateCarousel from '../components/BookingScreen/DateCarousal';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import dayjs from 'dayjs';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import {RootStackParamList} from '../navigation/routes';
import {useGetVenueById} from '../api/vanue';
import {useBookingFormStore} from '../store/useBookingFormStore';
import {BookingFormState} from '../store/useBookingFormStore';
import {useTheme} from '../context/ThemeContext';
import {getStyles} from '../styles/BookingSlotStyles';
import {
  useBookingById,
  useBookingFilter,
  useBookingMutation,
} from '../api/booking';

const BookingSlotScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'BookingSlot'>>();
  const {venueId} = route.params;
  const {data, isLoading} = useGetVenueById(venueId);
  const [index, setIndex] = useState(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    setBookedGrounds,
    setEndTime,
    setStartTime,
    endTime,
    startTime,
    bookedGrounds,
    setVenueId,
    setHourlyPrice,
    date,
  } = useBookingFormStore() as BookingFormState;

  useEffect(() => {
    setVenueId(Number(venueId));
    setBookedGrounds(data?.venue?.ground_details[index]?.ground);
  }, [venueId, setVenueId, setBookedGrounds, data, index]);

  const {data: bookingData} = useBookingFilter({
    venueId: venueId,
    ground: bookedGrounds,
    date: dayjs(date).format('YYYY-MM-DD'),
  });

  // const {bookingdata: bookingbyid} = useBookingById({
  //   venueId: venueId,
  // });
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const startSheetRef = useRef<BottomSheetModal>(null);
  const endSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%'], []);
  const duration = endTime.diff(startTime, 'hour');
  const timeSlots = useMemo(() => {
    return Array.from({length: 24}, (_, i) =>
      dayjs(date).startOf('hour').add(i, 'hour'),
    );
  }, [date]);

  const endTimeSlots = useMemo(() => {
    return Array.from({length: 24 - startTime.hour() - 1}, (_, i) =>
      startTime.add(i + 1, 'hour'),
    );
  }, [startTime]);

  const handleStartTimeSelect = (time: dayjs.Dayjs) => {
    console.log('triigggerrr');
    setStartTime(time);
    setEndTime(time.add(1, 'hour'));
    startSheetRef.current?.close();
  };

  const handleEndTimeSelect = (time: dayjs.Dayjs) => {
    setEndTime(time);
    endSheetRef.current?.close();
  };

  const bookedHours = useMemo(() => {
    const booked = new Set<number>();

    bookingData?.booking?.forEach((booking: any) => {
      const start = dayjs(booking?.start_time);
      const end = dayjs(booking?.end_time);
      const startHour = start.hour();
      const endHour = end.hour();

      for (let i = startHour; i < endHour; i++) {
        booked.add(i);
      }
    });

    return booked;
  }, [bookingData?.booking]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <AppHeader title="Venue" isApp />
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <ImageBackground
              source={theme.dark && require('../assets/ScreenShaded.png')}
              style={styles.headerGlow}
              resizeMode="cover">
              <View style={styles.venueListContainer}>
                <View style={styles.card}>
                  <View style={{flexDirection: 'column', gap: 16}}>
                    <Image
                      source={{uri: data?.venue?.images?.[0]}}
                      style={styles.image}
                    />
                    <Text style={styles.name1}>{data?.venue?.name}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.name}>
                        ₹ {data?.venue?.ground_details[index]?.hourly_price} /
                        Per Hour
                      </Text>
                      <View style={styles.detail}>
                        <Icon name="location" size={20} color={'#888'} />
                        <Text style={styles.name}>
                          {data?.venue?.location?.area},{' '}
                          {data?.venue?.location?.city}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.category}>
                      <Text style={styles.type}>
                        {data?.venue?.game_info?.type}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.slotContainer}>
                <DateCarousel />

                <View style={styles.card}>
                  <Text style={styles.label}>Selected Ground</Text>
                  <View style={{flexDirection: 'row', gap: 10}}>
                    {data?.venue?.ground_details?.map(
                      (ground: any, index: number) => {
                        const isSelected = bookedGrounds === ground.ground;

                        return (
                          <TouchableOpacity
                            key={ground.ground}
                            onPress={() => {
                              setIndex(index);
                              setBookedGrounds(ground?.ground);
                              setHourlyPrice(ground?.hourly_price);
                            }}
                            style={[
                              styles.inputWrapper2,
                              isSelected
                                ? styles.inputWrapper2Selected
                                : styles.inputWrapper2Unselected,
                            ]}>
                            <Text
                              style={[
                                styles.input2,
                                isSelected
                                  ? styles.input2Selected
                                  : styles.input2Unselected,
                              ]}>
                              Ground {ground.ground}
                            </Text>
                          </TouchableOpacity>
                        );
                      },
                    )}
                  </View>
                </View>
                <View style={styles.container1}>
                  <View style={styles.block}>
                    <Text style={styles.label}>Starting Time</Text>
                    <TouchableOpacity
                      style={styles.timeBox}
                      onPress={() => startSheetRef.current?.present()}>
                      <Text style={styles.timeText}>
                        {startTime.format('hh:mm A')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.centerBlock}>
                    <Text style={styles.duration}>
                      ------ {duration} hr ------
                    </Text>
                  </View>
                  <View style={styles.block}>
                    <Text style={styles.label}>Ending Time</Text>
                    <TouchableOpacity
                      style={styles.timeBox}
                      onPress={() => endSheetRef.current?.present()}>
                      <Text style={styles.timeText}>
                        {endTime.format('hh:mm A')}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <BottomSheetModal
                    ref={startSheetRef}
                    index={0}
                    snapPoints={snapPoints}
                    backgroundStyle={{backgroundColor: theme.colors.background}}
                    handleIndicatorStyle={{backgroundColor: '#666'}}
                    backdropComponent={props => (
                      <BottomSheetBackdrop
                        {...props}
                        disappearsOnIndex={-1}
                        appearsOnIndex={0}
                        pressBehavior="close"
                      />
                    )}>
                    <BottomSheetView>
                      <Text style={styles.modalTitle}>
                        Select Starting Time
                      </Text>
                      <ScrollView
                        contentContainerStyle={[
                          styles.grid,
                          {paddingBottom: 30},
                        ]}>
                        {timeSlots.map(time => {
                          const hour = time.hour();
                          const isBooked = bookedHours.has(hour);
                          const isSelected = startTime.isSame(time, 'hour');

                          return (
                            <TouchableOpacity
                              key={time.format()}
                              style={[
                                styles.timeSlot,
                                isSelected && styles.selectedSlot,
                                isBooked && styles.bookedSlot,
                              ]}
                              onPress={() =>
                                !isBooked && handleStartTimeSelect(time)
                              }
                              disabled={isBooked}>
                              <Text
                                style={[
                                  styles.slotText,
                                  isSelected && styles.selectedSlotText,
                                  isBooked && styles.bookedSlotText,
                                ]}>
                                {time.format('hh:mm A')}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </ScrollView>
                      <View style={styles.bottom}>
                        <LinearGradient
                          colors={['transparent', '#868685', 'transparent']}
                          start={{x: 0, y: 0.5}}
                          end={{x: 1, y: 0.5}}
                          style={styles.glowBorder}
                        />
                        <Text style={styles.booked}>
                          <View style={styles.dot} /> Booked
                        </Text>
                        <Text style={styles.selected}>
                          <View style={styles.dot1} /> Selected
                        </Text>
                      </View>
                    </BottomSheetView>
                  </BottomSheetModal>

                  <BottomSheetModal
                    ref={endSheetRef}
                    index={0}
                    snapPoints={snapPoints}
                    backgroundStyle={{backgroundColor: theme.colors.background}}
                    handleIndicatorStyle={{backgroundColor: '#666'}}
                    backdropComponent={props => (
                      <BottomSheetBackdrop
                        {...props}
                        disappearsOnIndex={-1}
                        appearsOnIndex={0}
                        pressBehavior="close"
                      />
                    )}>
                    <BottomSheetView>
                      <Text style={styles.modalTitle}>Select Ending Time</Text>
                      <ScrollView contentContainerStyle={styles.grid}>
                        {endTimeSlots.map(time => {
                          const hour = time.hour();
                          const isBooked = bookedHours.has(hour);
                          const isSelected = startTime.isSame(time, 'hour');

                          return (
                            <TouchableOpacity
                              key={time.format()}
                              style={[
                                styles.timeSlot,
                                endTime.isSame(time, 'hour') &&
                                  isSelected &&
                                  styles.selectedSlot,
                                isBooked && styles.bookedSlot,
                              ]}
                              onPress={() =>
                                !isBooked && handleEndTimeSelect(time)
                              }
                              disabled={isBooked}>
                              <Text
                                style={[
                                  styles.slotText,
                                  endTime.isSame(time, 'hour') &&
                                    styles.selectedSlotText,
                                ]}>
                                {time.format('hh:mm A')}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </ScrollView>
                    </BottomSheetView>
                  </BottomSheetModal>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('BookingForm', {data})}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </ScrollView>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default BookingSlotScreen;
