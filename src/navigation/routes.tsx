import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {PrivateRoute} from '../routes/PrivateRoute';
import AddVenueScreen from '../screens/AddVenueScreen';
import BookingCalenderScreen from '../screens/BookingCalenderScreen';
import EditVenueDetailsScreen from '../screens/EditVenueDetailsScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import ProfileInfoScreen from '../screens/ProfileInfoScreen';
import {VenueByIdDetailsScreen} from '../screens/VenueByIdDetailsScreen';
import {useAuthStore} from '../store/authStore';
import BookingByIdScreen from '../screens/BookingByIdScreen';
import VenueManageScreen from '../screens/VenueManageScreen';
import CustomerDetailsScreen from '../screens/CustomerDetailsScreen';
import CustomerIdDetailsScreen from '../screens/CustomerIdDetailsScreen';

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  BookingCalenderScreen: {
    venueId: string;
    price: number;
  };
  BookingDataById: {
    bookingId: string;
  };
};

const Stack = createNativeStackNavigator();

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
      {isAuthenticated ? (
        <Stack.Navigator>
          <Stack.Screen
            name="MainTabs"
            component={PrivateRoute}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Addvenue" component={AddVenueScreen} />
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

          {/* <Stack.Screen name="VenueManage" component={VenueManageScreen} /> */}
          <Stack.Screen name="VenueManage" component={VenueManageScreen} />
          {/* <Stack.Screen name="bookingData" component={BookingCalenderScreen} /> */}
          <Stack.Screen
            name="EditVenueDetails"
            component={EditVenueDetailsScreen}
          />
          <Stack.Screen
            name="CustomerDetails"
            component={CustomerDetailsScreen}
          />
          <Stack.Screen
            name="CustomerByID"
            component={CustomerIdDetailsScreen}
          />
        </Stack.Navigator>
      ) : (
        <OnboardingScreen />
      )}
    </NavigationContainer>
  );
}
