import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Divider, Text, useTheme} from 'react-native-paper';
import {useToast} from '../context/ToastContext';
import {useNavigation} from '@react-navigation/native';

const WelcomeTab = () => {
  const {colors} = useTheme();
  const {showToast} = useToast();
  const navigation = useNavigation();
  return (
    <View style={styles.welcomeContainer}>
      <Text variant="headlineLarge" style={styles.welcomeText}>
        Congratulations!
      </Text>
      <Text variant="titleMedium" style={styles.welcomeText}>
        Your account has been created successfully.
      </Text>
      <Divider style={styles.divider} />
      <Text variant="bodyMedium" style={{color: colors.onBackground}}>
        Please complete your profile to add venues, manage all your bookings,
        and access all features.
      </Text>
      <Button
        mode="contained"
        onPress={() => {
          showToast({
            message: 'Click on continue for Profile -->',
            type: 'success',
            actionLabel: 'Continue',
            onActionPress: () => {
              navigation.navigate('Account');
            },
          });
        }}
        style={styles.button}
        labelStyle={{fontWeight: 'bold'}}>
        Complete Profile
      </Button>
      <Text style={styles.separator}>──── or ────</Text>
      <Text
        variant="titleMedium"
        style={[styles.welcomeText, {marginBottom: 8}]}>
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

export default WelcomeTab;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
    padding: 15,
  },
  welcomeText: {
    color: '#000',
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
