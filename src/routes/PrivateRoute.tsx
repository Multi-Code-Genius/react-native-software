import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import BookingIcon from '../components/assets/BookingIcon';
import HomeIcon from '../components/assets/HomeIcon';
import ProfileIcon from '../components/assets/ProfileIcon';
import VenueIcon from '../components/assets/VenueIcon';
import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';
import VenueScreen from '../screens/VenueScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();

function PrivateRoute() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        animation: 'shift',
        tabBarStyle: {
          backgroundColor: '#191919',
          height: 75,
          paddingBottom: 5,
          paddingTop: 5,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          fontFamily: 'Montserrat-Regular',
          textTransform: 'capitalize',
          lineHeight: 15,
        },
        tabBarLabelPosition: 'below-icon',
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#898989',
        headerShown: false,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => <HomeIcon color={color} />,
        }}
      />

      <Tab.Screen
        name="Bookings"
        component={BookingScreen}
        options={{
          tabBarIcon: ({color}) => <BookingIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Venue"
        component={VenueScreen}
        options={{
          tabBarIcon: ({color}) => <VenueIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AccountScreen}
        options={{
          tabBarIcon: ({color}) => <ProfileIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default PrivateRoute;
