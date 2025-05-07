import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AccountScreen from '../screens/AccountScreen';
import BookingScreen from '../screens/BookingScreen';
import HomeScreen from '../screens/HomeScreen';
import {IconButton, Text, useTheme} from 'react-native-paper';

export function PrivateRoute() {
  const Tab = createBottomTabNavigator();
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: theme.colors.onPrimary,
        tabBarInactiveTintColor: 'grey',
        tabBarActiveBackgroundColor: theme.colors.primary,

        tabBarStyle: {
          backgroundColor: theme.colors.onPrimary,
          height: 70,
          elevation: 50,
        },

        tabBarItemStyle: {
          borderRadius: 5,
          margin: 8,
          overflow: 'hidden',
          flex: 1,
        },

        tabBarShowLabel: true,
        tabBarLabelPosition: 'beside-icon',
        tabBarLabel: ({focused, color}) =>
          focused ? (
            <Text
              style={{
                color,
                marginLeft: 5,
              }}>
              {route.name}
            </Text>
          ) : null,
        animation: 'fade',

        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <IconButton
              icon={focused ? 'home' : 'home-outline'}
              iconColor={color}
              size={focused ? 18 : size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <IconButton
              icon={focused ? 'calendar' : 'calendar-outline'}
              iconColor={color}
              size={focused ? 18 : size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <IconButton
              icon={focused ? 'person' : 'person-outline'}
              iconColor={color}
              size={focused ? 18 : size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
