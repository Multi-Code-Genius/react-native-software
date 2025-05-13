import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Divider, Icon, Text, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGetVenue} from '../api/vanue';
import {useToast} from '../context/ToastContext';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();

  const {data, isLoading} = useGetVenue();
  const {showToast} = useToast();

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate('VenueByID', {id: item?.id})}>
        <View style={styles.card}>
          <Image source={{uri: item?.images?.[0]}} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.category}</Text>
            <Text>{item.address}</Text>
            <Text style={{marginTop: 4}}>
              ₹{item.hourlyPrice} /
              <Icon source={'person'} size={10} />
            </Text>
            <Text style={styles.location}>
              {item.location?.area} - {item.location?.city}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const hasVenues = Array.isArray(data?.games) && data.games.length > 0;

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        {isLoading ? (
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
            <Text variant="bodyMedium" style={{color: colors.onBackground}}>
              Please complete your profile to add venues, manage all your
              bookings, and access all features.
            </Text>
            <Button
              mode="contained"
              // onPress={() => navigation.navigate('Account')}
              onPress={() => {
                showToast({
                  message: 'Click on continue for Profile -->',
                  type: 'success',
                  actionLabel: 'Continue',
                  onActionPress: () => {
                    navigation.navigate('Account');
                  },
                });
              }}
              style={styles.button}
              labelStyle={{fontWeight: 'bold'}}>
              Complete Profile
            </Button>
            <Text style={styles.separator}>──── or ────</Text>
            <Text
              variant="titleMedium"
              style={[styles.welcomeText, {marginBottom: 8}]}>
              Are you a sports turf owner?
            </Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Addvenue')}
              style={styles.button}
              labelStyle={{fontWeight: 'bold'}}>
              Add venue
            </Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    marginTop: 4,
    color: 'gray',
    fontSize: 12,
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
