import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card, Text} from 'react-native-paper';
import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from '../styles/bookingDetailStyles';
import BookingCard from '../components/VenueScreen/BookingCard';
import {ScrollView} from 'react-native-gesture-handler';
import {act} from 'react-test-renderer';

interface BookingCalenderScreenProps {
  navigation: any;
}
type BookingParamList = {
  BookingCalender: RouteParams;
};

type RouteParams = {
  id: string;
  price: string;
  name: string;
  venueId: string;
};

const BookingCalenderScreen = ({navigation}: BookingCalenderScreenProps) => {
  const [activeGround, setActiveGround] = useState('ground1');
  const route = useRoute<RouteProp<BookingParamList, 'BookingCalender'>>();
  const {id, price, name, venueId} = route.params;
  const venueid = route?.params?.venueId;

  return (
    <View style={styles.container}>
      <AppHeader isApp title={`Venue ${venueid}`} />
      <ImageBackground
        source={require('../assets/ScreenShaded.png')}
        style={styles.headerGlow}
        resizeMode="cover">
        <ScrollView>
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
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  onPress={() => setActiveGround('ground1')}
                  style={[
                    styles.tabs,
                    activeGround === 'ground1' && styles.tabActive,
                  ]}>
                  <Text
                    style={[
                      styles.tabText,
                      activeGround === 'ground1' && styles.tabActiveText,
                    ]}>
                    Ground 1
                  </Text>
                  <Text style={styles.groundSize}>30 * 60 feet</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setActiveGround('ground2')}
                  style={[
                    styles.tabs,
                    activeGround === 'ground2' && styles.tabActive,
                  ]}>
                  <Text
                    style={[
                      styles.tabText,
                      activeGround === 'ground2' && styles.tabActiveText,
                    ]}>
                    Ground 2
                  </Text>
                  <Text style={styles.groundSize}>40 * 60 feet</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{flexDirection: 'column', paddingVertical: 20, gap: 20}}>
                {activeGround === 'ground1' && (
                  <>
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
                  </>
                )}

                {activeGround === 'ground2' && (
                  <>
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
                  </>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default BookingCalenderScreen;
