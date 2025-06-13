import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

const BookingSuccess = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Background.png')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.section}>
          <Text style={styles.head}>Booking SuccessFul</Text>
          <Text style={styles.subhead}>
            Get Ready to play. Your turf is Booked.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default BookingSuccess;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  head: {
    fontSize: 32,
    fontWeight: 'medium',
    lineHeight: 42,
    color: '#FFF',
    fontFamily: 'ClashGrotesk-Regular',
  },
  section: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subhead: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#888888',
  },
});
