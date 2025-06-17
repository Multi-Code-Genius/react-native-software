import React, {useCallback, useMemo, useRef, useState} from 'react';
import  { useEffect } from 'react';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppHeader from '../components/AppHeader';
import {
  FlatList,
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-paper';
import BookingCard from '../components/VenueScreen/BookingCard';
import { getStyles } from '../styles/BookingScreenStyles';
import { useTheme } from '../context/ThemeContext';
import { useGetVenue } from '../api/vanue';
import { useBookingFilter } from '../api/booking';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';

const BookingScreen = () => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const groundSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%'], []);
  const navigation = useNavigation();
  const {theme} = useTheme();
  const isDark = theme.dark;
  const { data, refetch, isLoading } = useGetVenue()

  const styles = getStyles(theme);
  const statuses = [
    { label: 'Completed', color: theme.colors.orange },
    { label: 'Upcoming', color: theme.colors.violet },
    { label: 'Available', color: theme.colors.green },
  ];
  const filters = [
    'All',
    'Upcoming',
    'Available',
    'Completed',
    'Cricket',
    'Football',
  ];
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(data?.venues?.[0]?.id ?? "");
  const [selectedVenueName, setSelectedVenueName] = useState<string | null>(data?.venues?.[0]?.name ?? "");
  const [venueIndex, setVenueIndex] = useState<number>(0);
  const [selectedVenueGround, setSelectedVenueGround] = useState<string | null>(data?.venues?.[venueIndex]?.ground_details?.[0]?.ground ?? "");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  
  useFocusEffect(
    useCallback(() => {
      if (!isLoading) {
        refetch();
      }
    }, [refetch]),
  );


  useEffect(() => {
    setSelectedVenueGround('1')
  }, [selectedVenueId])

  const { data: bookingData, refetch: bookingRefetch } = useBookingFilter({
    venueId: selectedVenueId,
    ground: selectedVenueGround,
    date: dayjs(date).format('YYYY-MM-DD')
  })

  console.log('bookingData', bookingData)

  useEffect(() => {
    bookingRefetch()
  }, [selectedVenueGround, selectedVenueId, date, bookingRefetch])


  const [selectedFilter, setSelectedFilter] = useState('All');
  const openMenu = () => {
    sheetRef.current?.present();
  };

  const openGround = () => {
    groundSheetRef.current?.present();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <AppHeader />
          <ImageBackground
            source={theme.dark && require('../assets/ScreenShaded.png')}
            style={styles.headerGlow}
            resizeMode="cover">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                      style={[styles.dot, { backgroundColor: status.color }]}
                    />
                    <Text style={[styles.type, { color: status.color }]}>
                      {status.label}
                    </Text>
                  </View>
                ))}
              </View>
              <Text style={styles.Head}>BOOKING</Text>
              <View style={styles.filterContainer}>
                <TouchableOpacity style={styles.pill} onPress={openMenu}>
                  <Text style={styles.pillText}>{selectedVenueName}</Text>
                  <Icon
                    name="chevron-down"
                    color={isDark ? '#fff' : '#000'}
                    size={14}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.pill} onPress={openGround}>
                  <Text style={styles.pillText}>Ground {selectedVenueGround}</Text>
                  <Icon
                    name="chevron-down"
                    color={isDark ? '#fff' : '#000'}
                    size={14}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setOpen(true)} style={styles.pill}>
                  <Icon
                    name="calendar-outline"
                    color={isDark ? '#fff' : '#000'}
                    size={14}
                  />
                  <Text style={styles.pillText}>{date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                  })}</Text>
                  <Icon
                    name="chevron-down"
                    color={isDark ? '#fff' : '#000'}
                    size={14}
                  />
                </TouchableOpacity>
              </View>
              <Divider style={{ marginVertical: 5, borderColor: '#fff' }} />
              <View style={styles.flatlistContainer}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={filters}
                  keyExtractor={item => item}
                  renderItem={({ item }) => {
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
              <Divider style={{ marginVertical: 10, borderColor: '#fff' }} />
              <View style={{ gap: 20, padding: 20 }}>
                {
                  bookingData?.booking?.map((booking, index) => {
                    const now = dayjs();
                    const start = dayjs(booking?.start_time);
                    const end = dayjs(booking?.end_time);
                    const diffInHours = end.diff(start, 'hour');
                    // if (!selectedVenueGround || booking?.booked_grounds != selectedVenueGround + 1) {
                    //   return;
                    // }
                    return (
                      <BookingCard
                        key={index}
                        startTime={dayjs.utc(booking?.start_time).local().format('hh:mm A')}
                        endTime={dayjs.utc(booking?.end_time).local().format('hh:mm A')}
                        bgColor={dayjs(booking?.start_time)?.isBefore(now) ? "#784847" : "#514A86"}
                        name={booking?.customer?.name }
                        phone={booking?.customer?.mobile }
                        duration={diffInHours.toString()}
                        price={booking?.total_amount}
                        sport={data?.venues?.[venueIndex]?.game_info?.type}
                      />
                    )
                  })
                }
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
            <BottomSheetView style={{ padding: 16 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.text}>Your Listed Venue</Text>
                <TouchableOpacity
                  style={styles.addVenueButton}
                  onPress={() => navigation.navigate('Addvenue')}>
                  <Text style={styles.text1}>Add Venue</Text>
                  <Icon name="add-circle" size={20} color={'#fff'} />
                </TouchableOpacity>
              </View>

              {data?.venues?.map((venue, index) => (
                <TouchableOpacity
                  key={venue.id}
                  style={[
                    styles.venueCard,
                    selectedVenueId === venue.id && styles.venueCardSelected,
                  ]}
                  onPress={() => {
                    setSelectedVenueId(venue.id),
                      setSelectedVenueName(venue?.name)
                    setVenueIndex(index)

                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text style={styles.venueTitle}>{venue?.name}</Text>
                      <Text style={styles.venueLocation}>{venue?.location?.area}</Text>
                    </View>
                    <Icon
                      name={
                        selectedVenueId === venue.id
                          ? 'checkmark-circle'
                          : 'ellipse-outline'
                      }
                      size={22}
                      color={selectedVenueId === venue.id ? '#fff' : '#888'}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </BottomSheetView>
          </BottomSheetModal>
          <BottomSheetModal
            ref={groundSheetRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ backgroundColor: '#0F0F0F', borderRadius: 8 }}
            backdropComponent={props => (
              <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                pressBehavior="close"
              />
            )}>
            <BottomSheetView style={{ padding: 16 }}>
              <Text style={styles.text}>Your Listed Grounds of Turf 1</Text>

              {data?.venues?.[venueIndex]?.ground_details?.map((ground, index) => (
                <TouchableOpacity
                  key={ground?.ground}
                  style={[
                    styles.venueCard,
                    selectedVenueGround === ground?.ground && styles.venueCardSelected,
                  ]}
                  onPress={() => setSelectedVenueGround(ground?.ground)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text style={styles.venueTitle}>Ground {ground?.ground}</Text>
                      {/* <Text style={styles.venueLocation}>{venue.location}</Text> */}
                    </View>
                    <Icon
                      name={
                        selectedVenueGround === ground?.ground
                          ? 'checkmark-circle'
                          : 'ellipse-outline'
                      }
                      size={22}
                      color={selectedVenueGround === ground?.ground ? '#fff' : '#888'}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default BookingScreen;
