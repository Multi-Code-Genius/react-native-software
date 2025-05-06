import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useGetTabBarIcon} from '../hooks/useGetTabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

export function PrivateRoute() {
  const getDashboardIcon = useGetTabBarIcon('Dashboard');
  const getBookingsIcon = useGetTabBarIcon('Bookings');
  const getAccountIcon = useGetTabBarIcon('Account');

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{
          tabBarIcon: getDashboardIcon,
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={HomeScreen}
        options={{
          tabBarIcon: getBookingsIcon,
        }}
      />
      <Tab.Screen
        name="Account"
        component={ProfileScreen}
        options={{
          tabBarIcon: getAccountIcon,
        }}
      />
    </Tab.Navigator>
  );
}
