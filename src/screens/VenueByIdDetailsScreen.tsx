import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  ActivityIndicator,
  Divider,
  Icon,
  IconButton,
  Text,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGetVenueById} from '../api/vanue';

export const VenueByIdDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const venueById = route.params as {id?: string};
  const {data, isLoading} = useGetVenueById(venueById?.id);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator animating={true} size="large" color="#02b328" />
      </View>
    );
  }
  const game = data?.venue;

  if (!game) {
    return <Text>No venue data found.</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.editRow}>
          <View style={{flex: 1}} />
          <IconButton
            icon={'pencil'}
            size={22}
            iconColor="#306ef2"
            onPress={() =>
              navigation.navigate('EditVenueDetails', {id: venueById?.id})
            }
          />
        </View>
        <View style={styles.card}>
          <View style={styles.cardContainer}>
            <View style={styles.columnContainer}>
              <View style={styles.details2}>
                <View style={{flexDirection: 'row', gap: 5}}>
                  <Icon source="logo-dropbox" size={18} color="green" />
                  <Text style={styles.category}>Turf Name:</Text>
                </View>
                <Divider className="mb-2" />
                <Text style={styles.data}>{game.name}</Text>
              </View>
              <View style={styles.details}>
                <View style={{flexDirection: 'row', gap: 5}}>
                  <Icon source="tennisball" size={18} color="brown" />
                  <Text style={styles.category}>Game Type</Text>
                </View>
                <Divider className="mb-2" />
                <Text style={styles.data}>{game.game_info.type}</Text>
              </View>
            </View>
            <View style={styles.columnContainer}>
              <View style={styles.details}>
                <View style={{flexDirection: 'row', gap: 5}}>
                  <Icon source="cat" size={18} color="brown" />
                  <Text style={styles.category}>Category:</Text>
                </View>
                <Divider className="mb-2" />
                <Text style={styles.data}>{game.category}</Text>
              </View>
              <View style={styles.details2}>
                <View style={{flexDirection: 'row', gap: 5}}>
                  <Icon source="location" size={18} color="red" />
                  <Text style={styles.category}>Address:</Text>
                </View>
                <Divider className="mb-2" />
                <Text style={styles.data}>{game.address}</Text>
              </View>
            </View>

            <View style={styles.columnContainer}>
              <View style={[styles.details, {width: '100%'}]}>
                <View style={{flexDirection: 'row', gap: 5}}>
                  <Icon source="clipboard" size={18} color="purple" />
                  <Text style={styles.category}>Description</Text>
                </View>
                <Divider className="mb-2" />
                <Text style={styles.data}>{game.description}</Text>
              </View>
            </View>
            <View style={styles.columnContainer}>
              <View style={styles.details}>
                <View style={{flexDirection: 'row', gap: 5}}>
                  <Icon source="people" size={18} color="grey" />
                  <Text style={styles.category}>MaxPlayers</Text>
                </View>
                <Divider className="mb-2" />
                <Text style={styles.data}>{game.game_info?.maxPlayers}</Text>
              </View>
              <View style={styles.details2}>
                <View style={{flexDirection: 'row', gap: 5}}>
                  <Icon source="cash" size={18} color="brown" />
                  <Text style={styles.category}>Price/hr:</Text>
                </View>
                <Divider className="mb-2" />
                <Text style={styles.data}>₹{game.hourly_price}</Text>
              </View>
            </View>
            <View style={styles.columnContainer}>
              <View style={styles.details2}>
                <View style={{flexDirection: 'row', gap: 5}}>
                  <Icon source="people" size={18} color="grey" />
                  <Text style={styles.category}>City</Text>
                </View>
                <Divider className="mb-2" />
                <Text style={styles.data}>{game.location.city}</Text>
              </View>
              <View style={styles.details}>
                <View style={{flexDirection: 'row', gap: 5}}>
                  <Icon source="cash" size={18} color="brown" />
                  <Text style={styles.category}>Latitude:</Text>
                </View>
                <Divider className="mb-2" />
                <Text style={styles.data}>{game.location.lat}</Text>
              </View>
            </View>
            <View style={styles.columnContainer}>
              <View style={styles.details}>
                <View style={{flexDirection: 'row', gap: 5}}>
                  <Icon source="extension-puzzle" size={18} color="green" />
                  <Text style={styles.category}>grounds</Text>
                </View>
                <Divider className="mb-2" />
                <Text style={styles.data}>{game.grounds}</Text>
              </View>
              <View style={styles.details2}>
                <View style={{flexDirection: 'row', gap: 5}}>
                  <Icon source="cash" size={18} color="brown" />
                  <Text style={styles.category}>Longitude :</Text>
                </View>
                <Divider className="mb-2" />
                <Text style={styles.data}>{game.location.lng}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  data: {
    paddingTop: 10,
    fontSize: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  editRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: '#fff',
    textAlign: 'right',
  },
  details: {
    flex: 1,
    padding: 12,
    borderStyle: 'solid',
    width: '40%',
    borderWidth: 1,
    borderRadius: 10,
  },
  details2: {
    width: '60%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  detailsmain: {
    padding: 12,
    borderStyle: 'solid',
    borderRadius: 10,
    width: '30%',
    borderWidth: 1,
    flex: 1,
    gap: 5,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  columnContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
  cardContainer: {
    marginTop: 10,
    flex: 1,
    gap: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 18,
  },
  category: {
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    marginBottom: 10,
    fontSize: 18,
    backgroundColor: '#e9e9e9eb',
    padding: 10,
    borderRadius: 10,
  },
  description: {
    color: '#000000',
    backgroundColor: '#e9e9e9eb',
    padding: 10,
    fontSize: 18,
  },
});
