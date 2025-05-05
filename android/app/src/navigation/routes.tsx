import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuthStore} from '../store/authStore';
import {Button} from 'react-native-paper';

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

const HomeScreen = () => (
  <SafeAreaView className="flex-1 items-center justify-center bg-white">
    <Text>Home Screen</Text>
    <Button mode="contained-tonal">Click me</Button>
  </SafeAreaView>
);

const ProfileScreen = () => (
  <SafeAreaView className="flex-1 items-center justify-center bg-white">
    <Text>Profile Screen</Text>
  </SafeAreaView>
);

const DetailsScreen = () => (
  <SafeAreaView className="flex-1 items-center justify-center bg-white">
    <Text>Details Screen</Text>
  </SafeAreaView>
);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
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
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
