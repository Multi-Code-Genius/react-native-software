import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {lazy, useEffect} from 'react';
import {useAuthStore} from '../store/authStore';

import {
  DefaultTheme,
  DarkTheme as NavDarkTheme,
} from '@react-navigation/native';
import {useGetVenue} from '../api/vanue';
import {useTheme} from '../context/ThemeContext';
import {useNetInfo} from '@react-native-community/netinfo';

import BookingByIdScreen from '../screens/BookingByIdScreen';
import BookingFormScreen from '../screens/BookingFormScreen';
import BookingSlotScreen from '../screens/BookingSlotScreen';
import BookingSuccess from '../screens/BookingSuccess';
import BookingVenuesScreen from '../screens/BookingVenuesScreen';
import VenueByIdScreen from '../screens/VenueByIdScreen';
import PrivateRoute from '../routes/PrivateRoute';

const ProfileInfoScreen = lazy(() => import('../screens/ProfileInfoScreen'));
const AddVenueScreen = lazy(() => import('../screens/AddVenueScreen'));
const LoginScreen = lazy(() => import('../screens/LoginScreen'));
const OnboardingScreen = lazy(() => import('../screens/OnboardingScreen'));
const WelcomeScreen = lazy(() => import('../screens/WelcomeScreen'));

const VenueByIdDetailsScreen = lazy(
  () => import('../screens/VenueByIdDetailsScreen'),
);
const CustomerIdDetailsScreen = lazy(
  () => import('../screens/CustomerIdDetailsScreen'),
);
const CustomerDetailsScreen = lazy(
  () => import('../screens/CustomerDetailsScreen'),
);
const EditVenueDetailsScreen = lazy(
  () => import('../screens/EditVenueDetailsScreen'),
);

const OtpVerificationScreen = lazy(
  () => import('../screens/OtpVerificationScreen'),
);

export type MainTabsParamList = {
  Home: undefined;
  Booking: undefined;
  History: undefined;
  Profile: undefined;
  ProfileInfo: undefined;
};
export type RootStackParamList = {
  MainTabs: {screen: keyof MainTabsParamList} | undefined;
  Categories: undefined;
  Search: undefined;
  payment: undefined;
  bookingDateTimeDetails: undefined;
  BookingDetail: undefined;
  newcard: undefined;
  Settings: undefined;
  Help: undefined;
  Privacy: undefined;
  Profile: undefined;
  about: undefined;
  ground: undefined;
  BookingByID: {id: string};
  Notifications: undefined;
  Addvenue: {venueId?: string};
  Login: undefined;
  BookingSlot: {venueId?: string; bookingId?: string};
  BookingForm: {data: undefined};
  BookingSuccess: undefined;
  BookingVenues: undefined;
  OtpVerify: {phone: string};
};

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const {data} = useGetVenue();

  return (
    <Stack.Navigator>
      {data?.venues?.length === 0 && (
        <Stack.Screen
          name="welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
      )}

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
      <Stack.Screen
        name="ProfileInfo"
        component={ProfileInfoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="bookingData"
        component={VenueByIdScreen}
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
      <Stack.Screen
        name="BookingVenues"
        component={BookingVenuesScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="VenueByID" component={VenueByIdDetailsScreen} />
      <Stack.Screen
        name="BookingSlot"
        component={BookingSlotScreen}
        options={{headerShown: false, gestureEnabled: true}}
      />
      <Stack.Screen
        name="BookingForm"
        component={BookingFormScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BookingSuccess"
        component={BookingSuccess}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name="VenueManage" component={VenueManageScreen} /> */}
      {/* <Stack.Screen name="bookingData" component={BookingCalenderScreen} /> */}
      <Stack.Screen
        name="EditVenueDetails"
        component={EditVenueDetailsScreen}
      />
      <Stack.Screen name="CustomerDetails" component={CustomerDetailsScreen} />
      <Stack.Screen name="CustomerByID" component={CustomerIdDetailsScreen} />
    </Stack.Navigator>
  );
};

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
  const {theme} = useTheme();
  const navigationTheme = theme.dark ? NavDarkTheme : DefaultTheme;
  const netInfo = useNetInfo();

  console.log('netInfo', netInfo);

  useEffect(() => {
    const initialize = async () => {
      await initializeAuth();
    };
    initialize();
  }, [initializeAuth]);

  return (
    <NavigationContainer theme={navigationTheme}>
      {isAuthenticated ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
}
