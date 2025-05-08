import {useRoute} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {useGetVenueById} from '../api/vanue';

export const VenueByIdDetailsScreen = () => {
  const route = useRoute();
  const venueById = route.params as {id?: string};
  const {data} = useGetVenueById(venueById?.id);
  console.log('dataVenueId====>>>>>>', data);
  return (
    <View>
      <Text>hey</Text>
    </View>
  );
};
