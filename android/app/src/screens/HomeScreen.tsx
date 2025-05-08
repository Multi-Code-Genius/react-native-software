import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import { Button, Card, Divider, Text, useTheme } from 'react-native-paper';
import { useAccountLogic } from '../hooks/useAccountLogic';
import { useGetVenue } from '../api/vanue';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const { account, isLoading, onRefresh, refetch, refreshing } =
    useAccountLogic();
  const { data, isPending } = useGetVenue();
  console.log('data', data);

  const renderItem = ({ item }: any) => (
    <Card style={styles.card} mode="outlined">
      <Card.Cover source={{ uri: item?.images?.[0] }} />
      <Card.Title title={item.name} subtitle={item.category} />
      <Card.Content>
        <Text variant="titleMedium">{item.address}</Text>
        <Text variant="bodyMedium" style={styles.cardText}>
          Capacity: {item.capacity} | ₹{item.hourlyPrice}/hr
        </Text>
        <Text variant="bodySmall" style={styles.locationText}>
          Location: {item.location?.area}, {item.location?.city}
        </Text>
      </Card.Content>
    </Card>
  );

  const hasVenues = Array.isArray(data?.games) && data.games.length > 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {isPending ? (
        <ActivityIndicator color="#000000" />
      ) : hasVenues ? (
        <View style={styles.venueListContainer}>
          <View style={styles.header}>
            <Text variant="headlineLarge" style={styles.headerText}>
              Venue Details
            </Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Addvenue')}
              style={styles.button}>
              + Add venue
            </Button>
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
        <View style={styles.welcomeContainer}>
          <Text variant="headlineLarge" style={styles.welcomeText}>
            Congratulations!
          </Text>
          <Text variant="titleMedium" style={styles.welcomeText}>
            Your account has been created successfully.
          </Text>

          <Divider style={styles.divider} />

          <Text variant="bodyMedium" style={{ color: colors.onBackground }}>
            Please complete your profile to add venues, manage all your
            bookings, and access all features.
          </Text>

          <Button
            mode="contained"
            onPress={() => navigation.navigate('Account')}
            style={styles.button}
            labelStyle={{ fontWeight: 'bold' }}>
            Complete Profile
          </Button>

          <Text style={styles.separator}>──── or ────</Text>

          <Text
            variant="titleMedium"
            style={[styles.welcomeText, { marginBottom: 8 }]}>
            Are you a sports turf owner?
          </Text>

          <Button
            mode="contained"
            onPress={() => navigation.navigate('Addvenue')}
            style={styles.button}
            labelStyle={{ fontWeight: 'bold' }}>
            Add venue
          </Button>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardText: {
    marginTop: 4,
  },
  locationText: {
    marginTop: 4,
    color: 'gray',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
  button: {
    alignSelf: 'flex-start',
  },
  venueListContainer: {
    flex: 1,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  welcomeText: {
    color: '#000',
  },
  divider: {
    marginVertical: 16,
  },
  separator: {
    textAlign: 'left',
    color: 'gray',
    marginVertical: 8,
  },
});
