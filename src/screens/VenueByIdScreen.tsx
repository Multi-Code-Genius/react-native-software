import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useRef, useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import {Text} from 'react-native-paper';
import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from '../styles/bookingDetailStyles';
import BookingCard from '../components/VenueScreen/BookingCard';
import {ScrollView} from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';

interface BookingCalenderScreenProps {
  navigation: any;
}
type BookingParamList = {
  BookingCalender: {
    id: string;
    price: string;
    name: string;
    venueId: string;
  };
};

const CARD_HEIGHT = 200;

const VenueByIdScreen = ({navigation}: BookingCalenderScreenProps) => {
  const [activePage, setActivePage] = useState(0);
  const [cardCounts, setCardCounts] = useState<{[key: number]: number}>({});
  const animatedHeight = useRef(new Animated.Value(CARD_HEIGHT)).current;

  const route = useRoute<RouteProp<BookingParamList, 'BookingCalender'>>();
  const {venueId} = route.params;

  useEffect(() => {
    const count = cardCounts[activePage] || 1;
    const newHeight = count * CARD_HEIGHT;
    Animated.timing(animatedHeight, {
      toValue: newHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [activePage, cardCounts]);

  const registerCardCount = (index: number, count: number) => {
    setCardCounts(prev => ({...prev, [index]: count}));
  };

  const ground1Bookings = [1, 2, 3, 4];
  const ground2Bookings = [1, 2, 3, 4];

  useEffect(() => {
    registerCardCount(0, ground1Bookings.length);
    registerCardCount(1, ground2Bookings.length);
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader isApp title={`Venue ${venueId}`} />
      <ImageBackground
        source={require('../assets/ScreenShaded.png')}
        style={styles.headerGlow}
        resizeMode="cover">
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.venueListContainer}>
            <View style={styles.card}>
              <View style={{flexDirection: 'column', gap: 16}}>
                <Image
                  source={require('../assets/background1.png')}
                  style={styles.image}
                />
                <Text style={styles.name1}>Turf</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.name}>₹ 780 / Per Hour</Text>
                  <View style={styles.detail}>
                    <Icon name="location" size={20} color={'#888'} />
                    <Text style={styles.name}>Vesu , Surat</Text>
                  </View>
                </View>
                <View style={styles.category}>
                  <Text style={styles.type}>Cricket</Text>
                  <Text style={styles.type1}>Football</Text>
                </View>
              </View>

              {/* Tabs */}
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  onPress={() => setActivePage(0)}
                  style={[styles.tabs, activePage === 0 && styles.tabActive]}>
                  <Text
                    style={[
                      styles.tabText,
                      activePage === 0 && styles.tabActiveText,
                    ]}>
                    Ground 1
                  </Text>
                  <Text style={styles.groundSize}>30 * 60 feet</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setActivePage(1)}
                  style={[styles.tabs, activePage === 1 && styles.tabActive]}>
                  <Text
                    style={[
                      styles.tabText,
                      activePage === 1 && styles.tabActiveText,
                    ]}>
                    Ground 2
                  </Text>
                  <Text style={styles.groundSize}>40 * 60 feet</Text>
                </TouchableOpacity>
              </View>

              <Animated.View style={{height: animatedHeight}}>
                <PagerView
                  initialPage={0}
                  onPageSelected={e => {
                    const index = e.nativeEvent.position;
                    setActivePage(index);
                  }}
                  style={{flex: 1}}>
                  {/* Ground 1 */}
                  <View key="1" style={{paddingVertical: 20}}>
                    <View style={{gap: 20}}>
                      <BookingCard
                        startTime="09:00 am"
                        endTime="11:00 am"
                        bgColor="#784847"
                        name="Jaimin Kinariwala"
                        phone="98415874"
                        duration="2 Hr"
                        price="2000"
                        sport="Cricket"
                      />
                      <BookingCard
                        startTime="11:00 am"
                        endTime="12:00 am"
                        bgColor="#514A86"
                        name="Samarth Jariwala"
                        phone="98415874"
                        duration="2 Hr"
                        price="2000"
                        sport="Football"
                      />
                      <BookingCard
                        startTime="12:00 pm"
                        endTime="02:00 pm"
                        bgColor="#356850"
                        name="Aarav Mehta"
                        phone="98415874"
                        duration="2 Hr"
                        price="1600"
                        sport="Football"
                        isAvailable
                      />
                      <BookingCard
                        startTime="02:00 pm"
                        endTime="04:00 pm"
                        bgColor="#514A86"
                        name="Samarth Jariwala"
                        phone="98415874"
                        duration="2 Hr"
                        price="2000"
                        sport="Football"
                      />
                    </View>
                  </View>

                  {/* Ground 2 */}
                  <View key="2" style={{paddingVertical: 20}}>
                    <View style={{gap: 20}}>
                      <BookingCard
                        startTime="09:00 am"
                        endTime="11:00 am"
                        bgColor="#784847"
                        name="Jaimin Kinariwala"
                        phone="98415874"
                        duration="2 Hr"
                        price="2000"
                        sport="Cricket"
                      />
                      <BookingCard
                        startTime="11:00 am"
                        endTime="12:00 am"
                        bgColor="#514A86"
                        name="Samarth Jariwala"
                        phone="98415874"
                        duration="2 Hr"
                        price="2000"
                        sport="Football"
                      />
                      <BookingCard
                        startTime="12:00 pm"
                        endTime="02:00 pm"
                        bgColor="#356850"
                        name="Aarav Mehta"
                        phone="98415874"
                        duration="2 Hr"
                        price="1600"
                        sport="Football"
                        isAvailable
                      />
                      <BookingCard
                        startTime="02:00 pm"
                        endTime="04:00 pm"
                        bgColor="#514A86"
                        name="Samarth Jariwala"
                        phone="98415874"
                        duration="2 Hr"
                        price="2000"
                        sport="Football"
                      />
                    </View>
                  </View>
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
