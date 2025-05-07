import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Text, Button, Divider, Surface, useTheme} from 'react-native-paper';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();

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

      <Text style={styles.separator}>──── or ────</Text>

      <Text variant="bodyMedium" style={{color: colors.onBackground}}>
        If you're an employee, request the turf owner to add you to start using
        the app.
      </Text>
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
