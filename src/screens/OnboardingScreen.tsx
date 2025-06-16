import React from 'react';
import LottieView from 'lottie-react-native';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/routes';

const OnboardingScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <ImageBackground
      source={require('../assets/SplashScreen.png')}
      style={styles.container}
      resizeMode="cover">
      <View style={styles.imageWrapper}>
        <LottieView
          source={require('../assets/animation.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            Welcome To <Text style={styles.highlight}>TurfKeeper</Text>
          </Text>
        </View>
        <Text style={styles.title}>
          From Sports Venue Mangement{'\n'}To Business Insights{'\n'}All In One
          App
        </Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  lottie: {
    position: 'absolute',
    top: -40,
    alignSelf: 'center',
    width: 400,
    height: 844,
    zIndex: 2,
  },

  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
  },
  textContainer: {
    // marginTop: 400,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    width: '100%',
    paddingBottom: 10,
    // zIndex: 100,
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
    fontFamily: 'Montserrat-Regular',
  },
  highlight: {
    color: '#B2C000',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Regular',
  },
  title: {
    color: 'white',
    fontSize: 32,
    textAlign: 'left',
    lineHeight: 46,
    fontWeight: 'medium',
    marginBottom: 40,
    fontFamily: 'ClashGrotesk-Regular',
  },
  button: {
    backgroundColor: '#B2C000',
    paddingVertical: 16,
    paddingHorizontal: 40,
    width: '100%',
  },
  buttonText: {
    color: 'black',
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});
