import React from 'react';
import {Appbar, IconButton, useTheme} from 'react-native-paper';

const BookingScreenAppBar = ({navigation}: {navigation: any}) => {
  const theme = useTheme();
  return (
    <Appbar.Header
      style={{
        backgroundColor: theme.colors.primary,
        borderBottomColor: '#333333',
        borderBottomWidth: 1,
      }}
      statusBarHeight={0}>
      <IconButton
        icon="arrow-back"
        iconColor={theme.colors.onPrimary}
        onPress={() => navigation.goBack()}
      />
      <Appbar.Content
        title="Bookings"
        titleStyle={{color: theme.colors.onPrimary}}
      />
    </Appbar.Header>
  );
};

export default BookingScreenAppBar;
