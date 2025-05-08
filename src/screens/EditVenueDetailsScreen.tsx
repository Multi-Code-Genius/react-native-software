import {useRoute} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

const EditVenueDetailsScreen = () => {
  const route = useRoute();
  const venueId = route.params as {id?: string};
  console.log('venueId====;;;===', venueId);
  return (
    <View>
      <Text>hiiii</Text>
    </View>
  );
};

export default EditVenueDetailsScreen;
