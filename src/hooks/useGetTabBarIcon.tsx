import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function useGetTabBarIcon(routeName: string) {
  return ({color, size}: {color: string; size: number}) => {
    if (routeName === 'Dashboard') {
      return <Icon name="home-outline" size={size} color={color} />;
    } else if (routeName === 'Account') {
      return <Icon name="account-outline" size={size} color={color} />;
    } else if (routeName === 'Bookings') {
      return <Icon name="notebook-plus" size={size} color={color} />;
    }
    return null;
  };
}
