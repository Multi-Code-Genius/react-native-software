import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ImageBackground,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  FlatList,
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import BookingCard from '../components/VenueScreen/BookingCard';
import {getStyles} from '../styles/BookingScreenStyles';
import {useTheme} from '../context/ThemeContext';
import {useGetVenue} from '../api/vanue';
import {useBookingFilter} from '../api/booking';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import {A, ParamsTypes, AvailableSlot} from '../utils/helper';
import {RootStackParamList} from '../navigation/routes';
import {NavigationProp} from '@react-navigation/native';

const BookingScreen = () => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const groundSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%'], []);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {theme} = useTheme();
  const isDark = theme.dark;
  const styles = getStyles(theme);

  const [refreshing, setRefreshing] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState('All');

  const {data, refetch, isLoading} = useGetVenue();

  const [selectedVenueId, setSelectedVenueId] = useState<string>('');
  const [selectedVenueName, setSelectedVenueName] = useState<string>('');
  const [venueIndex, setVenueIndex] = useState<number>(0);
  const [selectedVenueGround, setSelectedVenueGround] = useState<string>('1');

  useEffect(() => {
    if (data?.venues?.length) {
      setSelectedVenueId(data.venues[0].id);
      setSelectedVenueName(data.venues[0].name);
      setSelectedVenueGround(data.venues[0].ground_details?.[0]?.ground ?? '1');
    }
  }, [data]);

  const {data: bookingData, refetch: bookingRefetch} = useBookingFilter({
    venueId: selectedVenueId,
    ground: selectedVenueGround,
    date: dayjs(date).format('YYYY-MM-DD'),
  });

  useFocusEffect(
    useCallback(() => {
      if (!isLoading) {
        refetch();
      }
    }, [refetch, isLoading]),
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetch(), bookingRefetch()]);
    setRefreshing(false);
  };

  const openMenu = () => {
    sheetRef.current?.present();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      bookingRefetch();
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedVenueGround, selectedVenueId, date, bookingRefetch]);

  const {available, completed, upComing, all} = A(bookingData?.booking);

  const filteredBookings = useMemo(() => {
    switch (selectedFilter) {
      case 'Upcoming':
        return upComing;
      case 'Available':
        return available;
      case 'Completed':
        return completed;
      default:
        return all;
    }
  }, [selectedFilter, available, completed, upComing, all]);

  const statuses = useMemo(
    () => [
      {label: 'Completed', color: theme.colors.orange},
      {label: 'Upcoming', color: theme.colors.violet},
      {label: 'Available', color: theme.colors.green},
    ],
    [theme.colors],
  );

  const filters = ['All', 'Upcoming', 'Available', 'Completed'];

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

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <AppHeader />
          <ImageBackground
            source={theme.dark && require('../assets/ScreenShaded.png')}
            style={styles.headerGlow}
            resizeMode="cover">
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }>
              <View style={styles.types}>
                {statuses.map((status, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                    }}>
                    <View
                      style={[styles.dot, {backgroundColor: status.color}]}
                    />
                    <Text style={[styles.type, {color: status.color}]}>
                      {status.label}
                    </Text>
                  </View>
                ))}
              </View>

              <Text style={styles.Head}>BOOKING</Text>

              <View style={styles.filterContainer}>
                <TouchableOpacity style={styles.pill} onPress={openMenu}>
                  <Text style={styles.pillText}>
                    {selectedVenueName || 'Venue'}
                  </Text>
                  <Icon
                    name="chevron-down"
                    color={isDark ? '#fff' : '#000'}
                    size={14}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.pill}
                  onPress={() => groundSheetRef.current?.present()}>
                  <Text style={styles.pillText}>
                    Ground {selectedVenueGround}
                  </Text>
                  <Icon
                    name="chevron-down"
                    color={isDark ? '#fff' : '#000'}
                    size={14}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.pill}
                  onPress={() => setOpen(true)}>
                  <Icon
                    name="calendar-outline"
                    color={isDark ? '#fff' : '#000'}
                    size={14}
                  />
                  <Text style={styles.pillText}>
                    {date.toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </Text>
                  <Icon
                    name="chevron-down"
                    color={isDark ? '#fff' : '#000'}
                    size={14}
                  />
                </TouchableOpacity>
              </View>

              <Divider style={{marginVertical: 5, borderColor: '#fff'}} />

              <View style={styles.flatlistContainer}>
                <FlatList
                  horizontal
                  data={filters}
                  keyExtractor={item => item}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => {
                    const isSelected = item === selectedFilter;
                    return (
                      <TouchableOpacity
                        onPress={() => setSelectedFilter(item)}
                        style={[
                          styles.filterItem,
                          isSelected
                            ? styles.filterItemSelected
                            : styles.filterItemUnselected,
                        ]}>
                        <Text
                          style={[
                            styles.filterItemText,
                            isSelected
                              ? styles.filterItemTextSelected
                              : styles.filterItemTextUnselected,
                          ]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

              <Divider style={{marginVertical: 10, borderColor: '#fff'}} />

              <View style={{gap: 20, padding: 20}}>
                {filteredBookings.map((booking, index) => {
                  const details = getBookingStatus(booking);
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
                      sport={data?.venues?.[venueIndex]?.game_info?.type}
                      bgColor={details.bgColor}
                    />
                  );
                })}
              </View>
            </ScrollView>

            <DatePicker
              modal
              open={open}
              date={date}
              mode="date"
              onConfirm={selectedDate => {
                setOpen(false);
                setDate(selectedDate);
              }}
              onCancel={() => setOpen(false)}
              theme="dark"
            />
          </ImageBackground>

          <BottomSheetModal
            ref={sheetRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={styles.bottommodal}
            backdropComponent={props => (
              <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                pressBehavior="close"
              />
            )}>
            <BottomSheetView style={{flex: 1, padding: 16}}>
              <View style={{flex: 1}}>
                <ScrollView
                  contentContainerStyle={{
                    paddingBottom: 100,
                    flexGrow: 1, // ✅ important for scroll inside BottomSheet
                  }}
                  onContentSizeChange={(width, height) => {
                    console.log('ScrollView content height:', height);
                  }}
                  keyboardShouldPersistTaps="handled"
                  // contentContainerStyle={{paddingBottom: 100}}
                  showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 16,
                    }}>
                    <Text style={styles.text}>Your Listed Venue</Text>
                    <TouchableOpacity
                      style={styles.addVenueButton}
                      onPress={() => navigation.navigate('Addvenue')}>
                      <Text style={styles.text1}>Add Venue</Text>
                      <Icon
                        name="add-circle"
                        size={20}
                        color={isDark ? '#FFF' : '#000'}
                      />
                    </TouchableOpacity>
                  </View>

                  {data?.venues?.map((venue: any, index: number) => (
                    <TouchableOpacity
                      key={venue.id}
                      style={[
                        styles.venueCard,
                        selectedVenueId === venue.id &&
                          styles.venueCardSelected,
                      ]}
                      onPress={() => {
                        setSelectedVenueId(venue.id);
                        setSelectedVenueName(venue.name);
                        setVenueIndex(index);
                        sheetRef.current?.close();
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View>
                          <Text style={styles.venueTitle}>{venue.name}</Text>
                          <Text style={styles.venueLocation}>
                            {venue.location?.area}
                          </Text>
                        </View>
                        <Icon
                          name={
                            selectedVenueId === venue.id
                              ? 'checkmark-circle'
                              : 'ellipse-outline'
                          }
                          size={22}
                          color={
                            selectedVenueId === venue.id
                              ? theme.colors.text
                              : '#888'
                          }
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </BottomSheetView>
          </BottomSheetModal>

          <BottomSheetModal
            ref={groundSheetRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{
              backgroundColor: theme.colors.background,
              borderRadius: 8,
            }}
            backdropComponent={props => (
              <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                pressBehavior="close"
              />
            )}>
            <BottomSheetView style={{padding: 16}}>
              <Text style={styles.text}>Your Listed Grounds of Turf 1</Text>
              {data?.venues?.[venueIndex]?.ground_details?.map(
                (ground: any) => (
                  <TouchableOpacity
                    key={ground.ground}
                    style={[
                      styles.venueCard,
                      selectedVenueGround === ground.ground &&
                        styles.venueCardSelected,
                    ]}
                    onPress={() => setSelectedVenueGround(ground.ground)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.venueTitle}>
                        Ground {ground.ground}
                      </Text>
                      <Icon
                        name={
                          selectedVenueGround === ground.ground
                            ? 'checkmark-circle'
                            : 'ellipse-outline'
                        }
                        size={22}
                        color={
                          selectedVenueGround === ground.ground
                            ? '#fff'
                            : '#888'
                        }
                      />
                    </View>
                  </TouchableOpacity>
                ),
              )}
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default BookingScreen;
