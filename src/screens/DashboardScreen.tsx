import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useAuthStore} from '../store/authStore';

const DashboardScreen = () => (
  <View className="flex-1 justify-center">
    <Text>Home Screen</Text>
    <Button
      icon="camera"
      mode="contained"
      onPress={() => useAuthStore.getState().logout()}>
      Press me
    </Button>
  </View>
);
export default DashboardScreen;
