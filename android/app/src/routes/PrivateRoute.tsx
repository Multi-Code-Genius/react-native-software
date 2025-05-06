import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useGetTabBarIcon} from '../hooks/useGetTabBarIcon';

import AccountScreen from '../screens/AccountScreen';
import DashboardScreen from '../screens/DashboardScreen';
import BookingScreen from '../screens/BookingScreen';

export function PrivateRoute() {
  const getDashboardIcon = useGetTabBarIcon('Dashboard');
  const getBookingsIcon = useGetTabBarIcon('Bookings');
  const getAccountIcon = useGetTabBarIcon('Account');

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: getDashboardIcon,
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingScreen}
        options={{
          tabBarIcon: getBookingsIcon,
          animation: 'none',
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: getAccountIcon,
        }}
      />
    </Tab.Navigator>
  );
}
