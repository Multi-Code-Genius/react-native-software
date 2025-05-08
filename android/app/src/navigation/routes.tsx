import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {PrivateRoute} from '../routes/PrivateRoute';
import AddVenueScreen from '../screens/AddVenueScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import {useAuthStore} from '../store/authStore';
import ProfileInfoScreen from '../screens/ProfileInfoScreen';
import BookingCalenderScreen from '../screens/BookingCalenderScreen';
import {VenueByIdDetailsScreen} from '../screens/VenueByIdDetailsScreen';

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
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
          <Stack.Screen name="booking" component={BookingCalenderScreen} />
          <Stack.Screen name="VenueByID" component={VenueByIdDetailsScreen} />
        </Stack.Navigator>
      ) : (
        <OnboardingScreen />
      )}
    </NavigationContainer>
  );
}
