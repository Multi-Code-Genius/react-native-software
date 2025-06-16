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
import {NavigationProp, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import dayjs from 'dayjs';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../styles/BookingSlotStyles';
import {RootStackParamList} from '../navigation/routes';
import { useGetVenueById } from '../api/vanue';
import { useBookingFormStore } from '../store/useBookingFormStore';
import { BookingFormState } from '../store/useBookingFormStore';

const BookingSlotScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'BookingSlot'>>();
  const { venueId } = route.params;
  const {data, isLoading} = useGetVenueById(venueId);
  const [index, setIndex] = useState(0)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {setBookedGrounds, setEndTime, setStartTime, endTime, startTime, bookedGrounds, setVenueId, setHourlyPrice} = useBookingFormStore() as BookingFormState;

  useEffect(() => {
    setVenueId(Number(venueId))
    setBookedGrounds(data?.venue?.ground_details[index]?.ground)

  }, [venueId, setVenueId, setBookedGrounds, data, index])


  const startSheetRef = useRef<BottomSheetModal>(null);
  const endSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%'], []);
  const duration = endTime.diff(startTime, 'hour');


  const timeSlots = useMemo(() => {
    return Array.from({length: 24}, (_, i) => dayjs().startOf('hour').add(i, 'hour'));
  }, []);

  const endTimeSlots = useMemo(() => {
    return Array.from({length: 24 - startTime.hour() - 1}, (_, i) =>
      startTime.add(i + 1, 'hour'),
    );
  }, [startTime]);

  const handleStartTimeSelect = (time: dayjs.Dayjs) => {
    setStartTime(time);
    setEndTime(time.add(1, 'hour'));
    startSheetRef.current?.close();
  };

  const handleEndTimeSelect = (time: dayjs.Dayjs) => {
    setEndTime(time);
    endSheetRef.current?.close();
  };


  if (isLoading){
    return <ActivityIndicator />
  }


  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <AppHeader title="Venue" isApp />
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <ImageBackground
              source={require('../assets/ScreenShaded.png')}
              style={styles.headerGlow}
              resizeMode="cover">
              <View style={styles.venueListContainer}>
                <View style={styles.card}>
                  <View style={{flexDirection: 'column', gap: 16}}>
                    <Image
                      source={{ uri: data?.venue?.images?.[0]}}
                      style={styles.image}
                    />
                    <Text style={styles.name1}>{data?.venue?.name}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.name}>₹ {data?.venue?.ground_details[index]?.hourly_price} / Per Hour</Text>
                      <View style={styles.detail}>
                        <Icon name="location" size={20} color={'#888'} />
                        <Text style={styles.name}>{data?.venue?.location?.area }, { data?.venue?.location?.city}</Text>
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
                {/* <View style={styles.card}>
                  <Text style={styles.label}>Sport Type</Text>
                  <View style={{flexDirection: 'row', gap: 10}}>
                    {sportTypes.map(type => (
                      <TouchableOpacity
                        key={type}
                        onPress={() => updateField('type', type)}
                        style={[
                          styles.inputWrapper2,
                          {
                            borderColor:
                              formData.gameInfo?.type === type
                                ? '#fff'
                                : '#999',
                            backgroundColor:
                              formData.gameInfo?.type === type
                                ? '#1D1D1D'
                                : '#333',
                          },
                        ]}>
                        <Icon
                          name={type === 'Cricket' ? 'cricket' : 'football'}
                          size={20}
                          color={
                            formData.gameInfo?.type === type
                              ? '#fff'
                              : '#717171'
                          }
                          style={styles.icon}
                        />
                        <Text
                          style={[
                            styles.input2,
                            {
                              color:
                                formData.gameInfo?.type === type
                                  ? '#fff'
                                  : '#717171',
                            },
                          ]}>
                          {type}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View> */}
                <View style={styles.card}>
                  <Text style={styles.label}>Select Ground</Text>
                  <View style={{flexDirection: 'row', gap: 10}}>
                    {data?.venue?.ground_details?.map((ground :any, index : number) => (
                      <TouchableOpacity
                        key={ground.ground
                        }
                        onPress={() => {
                          setIndex(index)
                          setBookedGrounds(ground?.ground)
                          setHourlyPrice(ground?.hourly_price)
      
                        }}
                        style={[
                          styles.inputWrapper2,
                          {
                            borderColor:
                            bookedGrounds === ground.ground
                              ? '#fff' : '#999',
                            backgroundColor:
                            bookedGrounds === ground.ground
                              ? '#1D1D1D' : '#333',
                          },
                        ]}>
                        <Text
                          style={[
                            styles.input2,
                            {
                              color:
                              bookedGrounds === ground.ground
                                ? '#fff' : '#717171',
                            },
                          ]}>
                          {ground.ground
                          }
                        </Text>
                      </TouchableOpacity>
                    ))}
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
                    backgroundStyle={{backgroundColor: '#0F0F0F'}}
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
                      <ScrollView contentContainerStyle={styles.grid}>
                        {timeSlots.map(time => (
                          <TouchableOpacity
                            key={time.format()}
                            style={[
                              styles.timeSlot,
                              startTime.isSame(time, 'hour') &&
                                styles.selectedSlot,
                            ]}
                            onPress={() => handleStartTimeSelect(time)}>
                            <Text
                              style={[
                                styles.slotText,
                                startTime.isSame(time, 'hour') &&
                                  styles.selectedSlotText,
                              ]}>
                              {time.format('hh:mm A')}
                            </Text>
                          </TouchableOpacity>
                        ))}
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
                    backgroundStyle={{backgroundColor: '#0F0F0F'}}
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
                        {endTimeSlots.map(time => (
                          <TouchableOpacity
                            key={time.format()}
                            style={[
                              styles.timeSlot,
                              endTime.isSame(time, 'hour') &&
                                styles.selectedSlot,
                            ]}
                            onPress={() => handleEndTimeSelect(time)}>
                            <Text
                              style={[
                                styles.slotText,
                                endTime.isSame(time, 'hour') &&
                                  styles.selectedSlotText,
                              ]}>
                              {time.format('hh:mm A')}
                            </Text>
                          </TouchableOpacity>
                        ))}
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
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('BookingForm')}>
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
