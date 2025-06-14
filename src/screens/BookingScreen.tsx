import React, {useMemo, useRef, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
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
import {useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import BookingCard from '../components/VenueScreen/BookingCard';
import {getStyles} from '../styles/BookingScreenStyles';
import {useTheme} from '../context/ThemeContext';

const BookingScreen = () => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const groundSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%'], []);
  const navigation = useNavigation();
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const statuses = [
    {label: 'Completed', color: theme.colors.orange},
    {label: 'Upcoming', color: theme.colors.violet},
    {label: 'Available', color: theme.colors.green},
  ];
  const filters = [
    'All',
    'Upcoming',
    'Available',
    'Completed',
    'Cricket',
    'Football',
  ];
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);
  const venues = [
    {id: '1', name: 'Venue 1', location: 'Vesu, Surat'},
    {id: '2', name: 'Venue 2', location: 'Adajan, Surat'},
  ];
  const Grounds = [
    {id: '1', name: 'Ground 1', location: '10 Available'},
    {id: '2', name: 'Ground 2', location: '10 Available'},
  ];
  const [selectedFilter, setSelectedFilter] = useState('All');
  const openMenu = () => {
    sheetRef.current?.present();
  };

  const openGround = () => {
    groundSheetRef.current?.present();
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
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
                  <Text style={styles.pillText}>Venue 1</Text>
                  <Icon name="chevron-down" color="#FFF" size={14} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.pill} onPress={openGround}>
                  <Text style={styles.pillText}>Ground 1</Text>
                  <Icon name="chevron-down" color="#FFF" size={14} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.pill}>
                  <Icon name="calendar-outline" color="#FFF" size={14} />
                  <Text style={styles.pillText}>01 Jun</Text>
                  <Icon name="chevron-down" color="#FFF" size={14} />
                </TouchableOpacity>
              </View>
              <Divider style={{marginVertical: 5, borderColor: '#fff'}} />
              <View style={styles.flatlistContainer}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={filters}
                  keyExtractor={item => item}
                  renderItem={({item}) => {
                    const isSelected = item === selectedFilter;
                    return (
                      <TouchableOpacity
                        onPress={() => setSelectedFilter(item)}
                        style={{
                          paddingHorizontal: 16,
                          height: 36,
                          borderRadius: 20,
                          backgroundColor: isSelected
                            ? '#1F1F1F'
                            : 'transparent',
                          borderWidth: isSelected ? 1 : 0,
                          borderColor: isSelected ? '#fff' : 'transparent',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 10,
                        }}>
                        <Text
                          style={{
                            color: isSelected ? '#fff' : '#ccc',
                            fontSize: 14,
                          }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
              <Divider style={{marginVertical: 10, borderColor: '#fff'}} />
              <View style={{gap: 20, padding: 20}}>
                <BookingCard
                  startTime="09:00 am"
                  endTime="11:00 am"
                  bgColor={theme.colors.orange}
                  name="Jaimin Kinariwala"
                  phone="98415874"
                  duration="2 Hr"
                  price="2000"
                  sport="Cricket"
                />
                <BookingCard
                  startTime="11:00 am"
                  endTime="12:00 am"
                  bgColor={theme.colors.violet}
                  name="Samarth Jariwala"
                  phone="98415874"
                  duration="2 Hr"
                  price="2000"
                  sport="Football"
                />
                <BookingCard
                  startTime="12:00 pm"
                  endTime="02:00 pm"
                  bgColor={theme.colors.green}
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
                  bgColor={theme.colors.violet}
                  name="Samarth Jariwala"
                  phone="98415874"
                  duration="2 Hr"
                  price="2000"
                  sport="Football"
                />
              </View>
            </ScrollView>
          </ImageBackground>
          <BottomSheetModal
            ref={sheetRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{backgroundColor: '#0F0F0F', borderRadius: 8}}
            backdropComponent={props => (
              <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                pressBehavior="close"
              />
            )}>
            <BottomSheetView style={{padding: 16}}>
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

              {venues.map((venue, index) => (
                <TouchableOpacity
                  key={venue.id}
                  style={[
                    styles.venueCard,
                    selectedVenueId === venue.id && styles.venueCardSelected,
                  ]}
                  onPress={() => setSelectedVenueId(venue.id)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text style={styles.venueTitle}>{venue.name}</Text>
                      <Text style={styles.venueLocation}>{venue.location}</Text>
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
            backgroundStyle={{backgroundColor: '#0F0F0F', borderRadius: 8}}
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

              {Grounds.map((venue, index) => (
                <TouchableOpacity
                  key={venue.id}
                  style={[
                    styles.venueCard,
                    selectedVenueId === venue.id && styles.venueCardSelected,
                  ]}
                  onPress={() => setSelectedVenueId(venue.id)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text style={styles.venueTitle}>{venue.name}</Text>
                      <Text style={styles.venueLocation}>{venue.location}</Text>
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
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default BookingScreen;
