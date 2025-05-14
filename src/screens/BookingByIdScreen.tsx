import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Appbar, IconButton} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {useBookingById} from '../api/booking';

const BookingByIdScreen = ({navigation}) => {
  const route = useRoute();
  const {bookingId} = route.params;
  const {data} = useBookingById(bookingId);
  console.log('data', data);
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
        <Appbar.Content
          title={data?.booking?.user?.name}
          titleStyle={{color: 'black'}}
        />
      </Appbar.Header>
    </View>
  );
};

export default BookingByIdScreen;

const styles = StyleSheet.create({});
