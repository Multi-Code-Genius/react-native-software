import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuthStore} from '../store/authStore';

import CustomerIdDetailsScreen from '../screens/CustomerIdDetailsScreen';
import CustomerDetailsScreen from '../screens/CustomerDetailsScreen';
import EditVenueDetailsScreen from '../screens/EditVenueDetailsScreen';
import VenueManageScreen from '../screens/VenueManageScreen';
import {VenueByIdDetailsScreen} from '../screens/VenueByIdDetailsScreen';
import BookingByIdScreen from '../screens/BookingByIdScreen';
import BookingCalenderScreen from '../screens/BookingCalenderScreen';
import ProfileInfoScreen from '../screens/ProfileInfoScreen';
import AddVenueScreen from '../screens/AddVenueScreen';
import {PrivateRoute} from '../routes/PrivateRoute';
import LoginScreen from '../screens/LoginScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

export type MainTabsParamList = {
  Home: undefined;
  Booking: undefined;
  History: undefined;
  Profile: undefined;
};
export type RootStackParamList = {
  MainTabs: {screen: keyof MainTabsParamList} | undefined;
  Categories: undefined;
  Search: undefined;
  payment: undefined;
  bookingDateTimeDetails: undefined;
  BookingDetail: undefined;
  MyProfile: undefined;
  newcard: undefined;
  Settings: undefined;
  Help: undefined;
  Privacy: undefined;
  about: undefined;
  ground: undefined;
  BookingByID: {id: string};
  Notifications: undefined;
};

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="welcome"
      component={WelcomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="MainTabs"
      component={PrivateRoute}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Addvenue"
      component={AddVenueScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen name="Profile" component={ProfileInfoScreen} />
    <Stack.Screen
      name="bookingData"
      component={BookingCalenderScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="bookingDataById"
      component={BookingByIdScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name="VenueByID" component={VenueByIdDetailsScreen} />

    <Stack.Screen name="VenueManage" component={VenueManageScreen} />
    {/* <Stack.Screen name="bookingData" component={BookingCalenderScreen} /> */}
    <Stack.Screen name="EditVenueDetails" component={EditVenueDetailsScreen} />
    <Stack.Screen name="CustomerDetails" component={CustomerDetailsScreen} />
    <Stack.Screen name="CustomerByID" component={CustomerIdDetailsScreen} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Onboarding"
      component={OnboardingScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="OtpVerify"
      component={OtpVerificationScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);
export default function AppNavigator() {
  const {isAuthenticated, initializeAuth} = useAuthStore();

  useEffect(() => {
    const initialize = async () => {
      await initializeAuth();
    };
    initialize();
  }, [initializeAuth]);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
}
