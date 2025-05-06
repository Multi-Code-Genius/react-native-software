import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useThemeStore} from '../store/themeStore';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {theme} = useThemeStore();

  const isDark = theme === 'dark';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View className={`flex-1 justify-center`}>
        <View className="w-full flex gap-4">
          <View>
            <Text className="text-4xl font-bold mb-2 text-black dark:text-white">
              Congratulations!
            </Text>
            <Text className="text-lg font-semibold text-black dark:text-white">
              Your account has been created successfully.
            </Text>
          </View>

          <View className="border-t border-gray-300 my-4" />

          <View className="flex gap-3">
            <Text className="font-semibold text-black dark:text-white">
              Are you a sports turf owner?
            </Text>

            <TouchableOpacity
              className="flex-row items-center border border-black px-4 py-2 rounded"
              onPress={() => navigation.navigate('Addvenue')}>
              <Text className="ml-2 text-black dark:text-white font-semibold">
                Add venue
              </Text>
            </TouchableOpacity>

            <Text className="text-left text-gray-400">──── or ────</Text>

            <Text className="font-semibold text-md text-black dark:text-white">
              If you're an employee, request the turf owner to add you to start
              using the app.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 16,
  },
});
