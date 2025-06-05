import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/routes';

const WelcomeSlideScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={require('../assets/Group6.png')} style={styles.image} />
      </View>

      <View style={styles.textContainer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            Welcome To <Text style={styles.highlight}>TurfKeeper</Text>
          </Text>
        </View>
        <Text style={styles.title}>
          From Turf Mangement{'\n'}To Business Insights{'\n'}All In One App
        </Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeSlideScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'black',
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
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    width: '100%',
    paddingBottom: 10,
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
    color: 'white',
    fontSize: 32,
    textAlign: 'left',
    lineHeight: 46,
    fontWeight: '500',
    marginBottom: 40,
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
    fontSize: 16,
    textAlign: 'center',
  },
});
