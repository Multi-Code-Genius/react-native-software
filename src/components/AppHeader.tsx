// components/AppHeader.tsx
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const AppHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const screenTitles: Record<string, string> = {
    Home: 'Turfkeeper',
    Bookings: 'Your Bookings',
    Venue: 'Venues',
    Profile: 'My Profile',
  };

  const title = screenTitles[route.name] || 'App';

  return (
    <View
      style={{
        height: 60,
        backgroundColor: '#191919',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
      }}>
      {/* Left: Title */}
      <Text
        style={{
          color: '#F5F5F5',
          fontSize: 24,
          fontWeight: '500',
          fontFamily: 'Clash Grotesk',
        }}>
        {title}
      </Text>

      {/* Right: Bell + Button */}
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
              fontFamily: 'Montserrat',
              color: '#000',
            }}>
            Book Venue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppHeader;
