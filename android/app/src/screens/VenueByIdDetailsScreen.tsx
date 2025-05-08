import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useGetVenueById} from '../api/vanue';

export const VenueByIdDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const venueById = route.params as {id?: string};
  const {data} = useGetVenueById(venueById?.id);
  console.log('dataVenueId====>>>>>>', data);
  return (
    <View style={{padding: 16}}>
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate('EditVenueDetails', {id: venueById})
        }>
        - Edit Venue Details
      </Button>
    </View>
  );
};
