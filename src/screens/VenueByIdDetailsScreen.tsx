import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
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
import {RootStackParamList} from '../navigation/routes';
import {styles} from '../styles/VenueByIdScreenStyles';

export const VenueByIdDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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
                  <Icon source="apps" size={18} color="brown" />
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
                  <Icon source="id-card" size={18} color="grey" />
                  <Text style={styles.category}>City</Text>
                </View>
                <Divider className="mb-2" />
                <Text style={styles.data}>{game.location.city}</Text>
              </View>
              <View style={styles.details}>
                <View style={{flexDirection: 'row', gap: 5}}>
                  <Icon source="earth" size={18} color="brown" />
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
                  <Icon source="compass" size={18} color="brown" />
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
