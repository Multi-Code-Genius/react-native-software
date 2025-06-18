import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, ImageBackground} from 'react-native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../assets/SplashScreen.png')}
      style={{flex: 1}}
      resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Text style={styles.title1}>Welcome To </Text>
          <Text style={styles.title2}>Turf Keeper</Text>
        </View>
        <Image source={require('../assets/Welcome.png')} style={styles.image} />
        <View style={styles.textContainer}>
          <View style={styles.titlecontainer}>
            <Text style={styles.title}>
              You're all set. Let’s take a few steps to manage your Sports Venue
              business
            </Text>
          </View>
          <View style={styles.buttoncontainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Addvenue' as never)}>
              <Text style={styles.buttonText}>Add Turf</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button2}
              onPress={() =>
                navigation.navigate('MainTabs', {screen: 'Account'})
              }>
              <Text style={styles.buttonText2}>Complete Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageWrapper: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 80,
    paddingLeft: 20,
  },
  image: {
    width: 186,
    height: 300,
  },
  textContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    width: '100%',
    paddingBottom: 10,
  },
  titlecontainer: {
    justifyContent: 'center',
    width: '100%',
  },
  badge: {
    backgroundColor: '#FFFFFF1A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  badgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
  },
  highlight: {
    color: '#B2C000',
    fontWeight: 'bold',
  },
  title: {
    color: '#888888',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    width: '80%',
    marginHorizontal: 'auto',
    fontFamily: 'ClashGrotesk-Regular',
  },
  title1: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Montserrat-Regular',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  title2: {
    color: '#B2C000',
    fontSize: 40,
    fontFamily: 'Montserrat-SemiBold',
  },
  button: {
    backgroundColor: '#B2C000',
    paddingVertical: 16,
    paddingHorizontal: 40,
    width: '100%',
  },
  button2: {
    backgroundColor: '#242600',
    paddingVertical: 16,
    paddingHorizontal: 40,
    width: '100%',
  },

  buttonText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
  },
  buttonText2: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
  },
  buttoncontainer: {
    width: '100%',
    gap: 10,
  },
});
