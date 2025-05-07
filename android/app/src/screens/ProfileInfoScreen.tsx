import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Text} from 'react-native-paper';

const ProfileInfoScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileRound} />
      <Text style={styles.title}>Profile Information</Text>
      <View style={{width: '100%', gap: 10}}>
        <TextInput
          label="Email"
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
          placeholder="Enter your email"
        />
        <TextInput
          label="Name"
          mode="outlined"
          style={styles.input}
          placeholder="Enter your name"
        />
        <TextInput
          label="Phone Number"
          mode="outlined"
          style={styles.input}
          placeholder="Enter Phone Number"
        />
        <TextInput
          label="Phone Number"
          mode="outlined"
          style={styles.input}
          placeholder="Enter Phone Number"
        />
      </View>
    </View>
  );
};

export default ProfileInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    marginTop: 20,
  },
  profileRound: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    maxWidth: 400,
    marginTop: 8,
  },
});
