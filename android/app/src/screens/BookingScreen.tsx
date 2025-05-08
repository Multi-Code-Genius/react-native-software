import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import { Card, Text, useTheme } from 'react-native-paper';
import { useGetVenue } from '../api/vanue';
import { useNavigation } from '@react-navigation/native';
import BookingCalenderScreen from './BookingCalenderScreen';

const BookingScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { data, isPending } = useGetVenue();

  const renderItem = ({ item }: any) => (
    <Card
      style={[styles.card, styles.shadow]}
      mode="elevated"
      onPress={() =>
        (navigation as any).navigate('booking', { venueId: item.id })
      }
    >
      <Card.Content>
        <Text variant="titleMedium" style={styles.venueName}>
          {item.name}
        </Text>
        <Text style={styles.chip}>{item.category}</Text>

        <Text style={styles.cardText}>
          🏛️ <Text style={styles.boldText}>Address:</Text> {item.address}
        </Text>
        <Text style={styles.cardText}>
          👥 <Text style={styles.boldText}>Capacity:</Text> {item.capacity}
        </Text>
        <Text style={styles.cardText}>
          💰 <Text style={styles.boldText}>Price:</Text> ₹{item.hourlyPrice}/hr
        </Text>
        <Text style={styles.locationText}>
          📍 {item.location?.area}, {item.location?.city}
        </Text>
      </Card.Content>
    </Card>
  );


  const hasVenues = Array.isArray(data?.games) && data.games.length > 0;
  return (
    <View className="flex-1">
      {hasVenues ? (
        <View style={styles.venueListContainer}>
          <View style={styles.header}>
            <Text variant="headlineLarge" style={styles.headerText}>
              Venue Details
            </Text>
          </View>
          <FlatList
            data={data.games}
            renderItem={renderItem}
            keyExtractor={(item: any) =>
              item.id?.toString() ?? Math.random().toString()
            }
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <BookingCalenderScreen />
      )}
    </View>
  );
};

export default BookingScreen;


const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
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
    fontSize: 14,
    marginBottom: 4,
  },
  boldText: {
    fontWeight: '600',
  },
  locationText: {
    marginTop: 6,
    fontSize: 13,
    color: 'gray',
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
    flex: 1,
    marginBottom: 20,
    padding: 10,
  },
})