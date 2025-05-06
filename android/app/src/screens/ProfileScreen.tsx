import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuthStore} from '../store/authStore';

const ProfileScreen = () => (
  // You have to use SafeAreaView like below every time you are making screen wrap your screen with it.
  // (NOT A COMPONENT I AM TALKING ABOUT SCREENS !)
  <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
    <View className="flex-1 justify-center">
      <Text>Home Screen</Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => useAuthStore.getState().logout()}>
        Press me
      </Button>
    </View>
  </SafeAreaView>
);
export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 16,
  },
});
