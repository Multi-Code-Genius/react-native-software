import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const AppHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const screenTitles: Record<string, string> = {
    Home: 'Turfkeeper',
    Bookings: 'Turfkeeper',
    Venue: 'Turfkeeper',
    Profile: 'Turfkeeper',
  };

  const title = screenTitles[route.name] || 'App';

  return (
    <View>
      <View
        style={{
          height: 60,
          backgroundColor: '#191919',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 24,
        }}>
        <Text
          style={{
            color: '#F5F5F5',
            fontSize: 24,
            fontWeight: '500',
            fontFamily: 'ClashGrotesk-Regular',
            lineHeight: 30,
            letterSpacing: 2,
          }}>
          {title}
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
          <View style={{position: 'relative'}}>
            <Icon name="notifications-outline" size={24} color="#fff" />
            <View
              style={{
                position: 'absolute',
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: 'red',
                top: 0,
                right: 0,
              }}
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#B2C000',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 4,
            }}
            onPress={() => console.log('Book Venue')}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: '600',
                fontFamily: 'Montserrat-Regular',
                color: '#000',
              }}>
              Book Venue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <LinearGradient
        colors={['transparent', '#B2C000', 'transparent']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.glowBorder}
      />
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  glowBorder: {
    position: 'absolute',
    bottom: 0,
    width: '90%',
    height: 2,
    alignSelf: 'center',
    zIndex: 2,
  },
});
