import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Appbar, IconButton} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';

const BookingByIdScreen = ({navigation}) => {
  const route = useRoute();
  const {bookingId} = route.params;
  console.log('bookingId', bookingId);
  return (
    <View style={{flex: 1}}>
      <Appbar.Header
        style={{
          backgroundColor: 'white',
          borderBottomColor: '#e0e0e0',
          borderBottomWidth: 2,
        }}
        statusBarHeight={0}>
        <IconButton
          icon="arrow-back"
          iconColor={'black'}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title="Bookings" titleStyle={{color: 'black'}} />
      </Appbar.Header>
    </View>
  );
};

export default BookingByIdScreen;

const styles = StyleSheet.create({});
