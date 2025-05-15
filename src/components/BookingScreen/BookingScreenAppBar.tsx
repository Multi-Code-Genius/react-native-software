import React from 'react';
import {Appbar, IconButton} from 'react-native-paper';

const BookingScreenAppBar = ({navigation}: {navigation: any}) => {
  return (
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
  );
};

export default BookingScreenAppBar;
