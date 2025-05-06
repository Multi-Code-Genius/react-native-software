import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuthStore} from '../store/authStore';
import {Button} from 'react-native-paper';
import OnboardingScreen from '../screens/OnboardingScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddVenueScreen from '../screens/AddVenueScreen';
import HomeScreen from '../screens/HomeScreen';

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

const ProfileScreen = () => <Text>Profile Screen</Text>;

const DetailsScreen = () => <Text>Details Screen</Text>;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function getTabBarIcon(routeName: string) {
  return ({color, size}: {color: string; size: number}) => {
    if (routeName === 'Home') {
      return <Icon name="home-outline" size={size} color={color} />;
    } else if (routeName === 'Profile') {
      return <Icon name="account-outline" size={size} color={color} />;
    }
    return null;
  };
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: getTabBarIcon(route.name),
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

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
      {!isAuthenticated ? (
        <Stack.Navigator>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen
            name="Addvenue"
            component={AddVenueScreen}
            options={{headerStyle: {backgroundColor: 'transperent'}}}
          />
        </Stack.Navigator>
      ) : (
        <OnboardingScreen />
      )}
    </NavigationContainer>
  );
}
