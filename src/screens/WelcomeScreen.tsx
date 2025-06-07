import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Text style={styles.title1}>Welcome To </Text>
        <Text style={styles.title2}>Turf Keeper</Text>
      </View>
      <View style={styles.textContainer}>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>
            You're all set. Let’s take a few steps to manage your turf business
          </Text>
        </View>
        <View style={styles.buttoncontainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Addvenue' as never)}>
            <Text style={styles.buttonText}>Add Turf</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.buttonText2}>Complete Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
  imageWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 80,
    paddingLeft: 20,
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
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '400',
    marginBottom: 20,
    width: '80%',
    marginHorizontal: 'auto',
    fontFamily: 'ClashGrotesk-Regular',
  },
  title1: {
    color: 'white',
    fontSize: 24,
    fontWeight: '400',
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
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
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
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonText2: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  buttoncontainer: {
    width: '100%',
    gap: 10,
  },
});
