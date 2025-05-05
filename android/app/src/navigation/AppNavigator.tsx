import {useEffect} from 'react';
import {useAuthStore} from '../store/authStore';
import {View, Text} from 'react-native';

const AppNavigator = () => {
  const {isAuthenticated, initializeAuth} = useAuthStore();

  useEffect(() => {
    const initialize = async () => {
      await initializeAuth();
    };
    initialize();
  }, [initializeAuth]);

  return (
    <View className="bg-red-500">
      {isAuthenticated ? (
        <View>
          <Text>Hello</Text>
        </View>
      ) : (
        <View>
          <Text className="text-blue-800">Hello</Text>
        </View>
      )}
    </View>
  );
};

export default AppNavigator;
