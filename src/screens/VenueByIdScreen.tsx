import {RouteProp, useRoute} from '@react-navigation/native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useGetVenueById} from '../api/vanue';
import AppHeader from '../components/AppHeader';
import BookingCard from '../components/VenueScreen/BookingCard';
import {useTheme} from '../context/ThemeContext';
import {getStyles} from '../styles/bookingDetailStyles';
import {A, AvailableSlot, ParamsTypes} from '../utils/helper';
import {useBookingFilter} from '../api/booking';

dayjs.extend(utc);

type BookingParamList = {
  BookingCalender: {
    id: string;
    price: string;
    name: string;
    venueId: string;
  };
};

const CARD_HEIGHT = 200;

const VenueByIdScreen = () => {
  const [activePage, setActivePage] = useState(0);
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const route = useRoute<RouteProp<BookingParamList, 'BookingCalender'>>();
  const {venueId} = route.params;
  const {data, refetch} = useGetVenueById(venueId);
  const [refreshing, setRefreshing] = useState(false);

  const [cardCounts, setCardCounts] = useState<{[key: number]: number}>({});
  const animatedHeight = useRef(new Animated.Value(CARD_HEIGHT)).current;

  const {data: bookingData, refetch: bookingRefetch} = useBookingFilter({
    venueId: venueId,
    ground: activePage + 1,
    date: dayjs().format('YYYY-MM-DD'),
  });

  const {all} = A(bookingData?.booking);

  const filteredBookings = useMemo(() => {
    return all;
  }, [all]);

  const getBookingStatus = (booking: ParamsTypes[number] | AvailableSlot) => {
    const now = dayjs();
    const start = dayjs(booking.start_time);
    const end = dayjs(booking.end_time);
    const diffInHours = end.diff(start, 'hour');
    const isAvailable = 'isAvailable' in booking ? booking.isAvailable : false;
    const isBooked = 'customer' in booking && booking.customer;

    let bgColor = theme.colors.violet;
    if (isAvailable) {
      bgColor = theme.colors.green;
    } else if (isBooked) {
      bgColor = start.isBefore(now) ? theme.colors.orange : theme.colors.violet;
    }

    return {
      startTime: start.utc().local().format('hh:mm A'),
      endTime: end.utc().local().format('hh:mm A'),
      duration: diffInHours.toString(),
      isAvailable,
      isBooked,
      bgColor,
      name: isBooked ? booking.customer?.name ?? '' : '',
      phone: isBooked ? booking.customer?.mobile ?? '' : '',
      price:
        'total_amount' in booking ? booking.total_amount?.toString() ?? '' : '',
    };
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetch(), bookingRefetch()]);
    setRefreshing(false);
  };

  useEffect(() => {
    const count = cardCounts[activePage] || 1;
    const newHeight = count * CARD_HEIGHT;
    Animated.timing(animatedHeight, {
      toValue: newHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [activePage, cardCounts, animatedHeight]);

  const registerCardCount = useCallback((index: number, count: number) => {
    setCardCounts(prev => ({...prev, [index]: count}));
  }, []);

  useEffect(() => {
    registerCardCount(activePage, filteredBookings?.length);
  }, [registerCardCount, activePage, filteredBookings?.length]);

  return (
    <View style={styles.container}>
      <AppHeader isApp title={`Venue ${venueId}`} />
      <ImageBackground
        source={theme.dark && require('../assets/ScreenShaded.png')}
        style={styles.headerGlow}
        resizeMode="cover">
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
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
                    ₹ {data?.venue?.ground_details?.[activePage]?.hourly_price}{' '}
                    / Per Hour
                  </Text>
                  <View style={styles.detail}>
                    <Icon name="location" size={20} color={'#888'} />
                    <Text style={styles.name}>
                      {' '}
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

              <View style={styles.tabContainer}>
                {data?.venue?.ground_details?.map((g: any, i: number) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      onPress={() => setActivePage(i)}
                      style={[
                        styles.tabs,
                        activePage === i && styles.tabActive,
                      ]}>
                      <Text
                        style={[
                          styles.tabText,
                          activePage === i && styles.tabActiveText,
                        ]}>
                        Ground {g?.ground}
                      </Text>
                      <Text style={styles.groundSize}>
                        {g?.width} * {g?.height} feet
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Animated.View style={{height: animatedHeight}}>
                <PagerView
                  initialPage={0}
                  onPageSelected={e => {
                    const index = e.nativeEvent.position;
                    setActivePage(index);
                  }}
                  style={{flex: 1}}>
                  {data?.venue?.ground_details?.map((i: any, index: number) => {
                    return (
                      <View key={index} style={{paddingVertical: 20}}>
                        <View style={{gap: 20}}>
                          {filteredBookings?.map((booking, index) => {
                            const details = getBookingStatus(booking);
                            console.log('details', details);
                            return (
                              <BookingCard
                                key={index}
                                isAvailable={details.isAvailable}
                                startTime={details.startTime}
                                endTime={details.endTime}
                                duration={details.duration}
                                price={details.price}
                                name={details.name}
                                phone={details.phone}
                                sport={data?.venue?.game_info?.type}
                                bgColor={details.bgColor}
                              />
                            );
                          })}
                        </View>
                      </View>
                    );
                  })}
                </PagerView>
              </Animated.View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default VenueByIdScreen;
