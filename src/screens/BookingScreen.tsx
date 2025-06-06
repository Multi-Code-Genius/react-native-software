import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Card, Icon, Text} from 'react-native-paper';
import {useGetVenue} from '../api/vanue';
import {SafeAreaView} from 'react-native-safe-area-context';
import WelcomeTab from '../components/WelcomeTab';
import AppHeader from '../components/AppHeader';

const BookingScreen = () => {
  const navigation = useNavigation();
  const {data, refetch} = useGetVenue();
  const hasVenues = Array.isArray(data?.venues) && data.venues.length > 0;
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );
  const renderItem = ({item}: any) => (
    <Card
      style={[styles.card, styles.shadow]}
      mode="elevated"
      onPress={() =>
        (navigation as any).navigate('bookingData', {
          venueId: item.id,
          price: item.hourlyPrice,
        })
      }>
      <Card.Content>
        <Text variant="titleMedium" style={styles.venueName}>
          {item.name}
        </Text>
        <Text style={styles.chip}>{item.category}</Text>
        <View style={{flex: 1, gap: 8}}>
          <View style={{flex: 1, flexDirection: 'row', gap: 10}}>
            <Icon source="location" size={18} color="green" />
            <Text style={styles.boldText}>Address: {item.address}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', gap: 10}}>
            <Icon source="people" size={18} color="skyblue" />
            <Text style={styles.boldText}>
              Max Players: {item.game_info.maxPlayers}
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', gap: 10}}>
            <Icon source="cash" size={18} color="brown" />
            <Text style={styles.boldText}>Price: ₹{item.hourly_price}/hr</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', gap: 10}}>
            <Icon source="map" size={18} color="orange" />
            <Text>{item.location?.city}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <AppHeader />
      {hasVenues ? (
        <View className="flex-1">
          <View style={styles.venueListContainer}>
            <View style={styles.header}>
              <Text variant="headlineLarge" style={styles.headerText}>
                Venue Details
              </Text>
            </View>
            <FlatList
              data={data?.venues}
              renderItem={renderItem}
              keyExtractor={(item: any) =>
                item.id?.toString() ?? Math.random().toString()
              }
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      ) : (
        <WelcomeTab />
      )}
    </SafeAreaView>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  venueName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  chip: {
    backgroundColor: '#e0f7fa',
    color: '#00796b',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 12,
    marginBottom: 8,
  },
  cardText: {
    flex: 1,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: '600',
  },
  locationText: {
    marginTop: 6,
    fontSize: 13,
    color: 'gray',
    flex: 1,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
  },
  venueListContainer: {
    margin: 10,
    backgroundColor: 'white',
    marginBottom: 100,
    padding: 10,
  },
});
