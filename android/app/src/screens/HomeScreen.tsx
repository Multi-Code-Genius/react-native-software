import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Divider, Text, useTheme} from 'react-native-paper';
import {useAccountLogic} from '../hooks/useAccountLogic';
import {useGetVenue} from '../api/vanue';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();

  const {account, isLoading, onRefresh, refetch, refreshing} =
    useAccountLogic();
  const {data} = useGetVenue();

  console.log('account', data);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text
        variant="headlineLarge"
        style={{color: colors.onBackground, marginBottom: 8}}>
        Congratulations!
      </Text>
      <Text variant="titleMedium" style={{color: colors.onBackground}}>
        Your account has been created successfully.
      </Text>

      <Divider style={styles.divider} />

      <Text variant="bodyMedium" style={{color: colors.onBackground}}>
        Please complete your profile to add venues, manage all your bookings,
        and access all features.
      </Text>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Account')}
        style={styles.button}
        labelStyle={{fontWeight: 'bold'}}>
        Complete Profile
      </Button>

      <Text style={styles.separator}>──── or ────</Text>

      <Text
        variant="titleMedium"
        style={{color: colors.onBackground, marginBottom: 8}}>
        Are you a sports turf owner?
      </Text>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Addvenue')}
        style={styles.button}
        labelStyle={{fontWeight: 'bold'}}>
        Add venue
      </Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
    padding: 16,
  },
  divider: {
    marginVertical: 16,
  },
  button: {
    alignSelf: 'flex-start',
  },
  separator: {
    textAlign: 'left',
    color: 'gray',
    marginVertical: 8,
  },
});
