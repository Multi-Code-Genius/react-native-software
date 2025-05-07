import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, Alert} from 'react-native';
import {TextInput, Text, Button, ActivityIndicator} from 'react-native-paper';
import {useUpdateAccountInfo} from '../api/account';
import {useRoute} from '@react-navigation/native';

const ProfileInfoScreen = () => {
  const {params} = useRoute();
  const {data} = params as {data: any};
  const [pressed, setPressed] = useState(false);
  const {mutate: updateInfo, isPending} = useUpdateAccountInfo();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    mobileNumber: '',
  });

  useEffect(() => {
    if (data) {
      setFormData({
        email: data?.user?.email || '',
        name: data?.user?.name || '',
        mobileNumber: data?.user?.mobileNumber || '',
      });
    }
  }, []);

  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const updateFields: Partial<typeof formData> = {};
    (Object.keys(formData) as (keyof typeof formData)[]).forEach(key => {
      if (formData[key] !== data?.user?.[key]) {
        updateFields[key] = formData[key];
      }
    });

    updateInfo(updateFields, {
      onSuccess: () => Alert.alert('Success', 'Profile updated successfully!'),
      onError: (error: any) =>
        Alert.alert('Error', error?.message || 'Failed to update.'),
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileRound} />
      <Text style={styles.title}>Profile Information</Text>
      <View style={styles.form}>
        <TextInput
          label="Email"
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
          value={formData?.email}
          placeholder="Enter your email"
          onChangeText={text => handleChange('email', text)}
        />
        <TextInput
          label="Name"
          mode="outlined"
          style={styles.input}
          value={formData?.name}
          placeholder="Enter your name"
          onChangeText={text => handleChange('name', text)}
        />
        <TextInput
          label="Phone Number"
          mode="outlined"
          keyboardType="phone-pad"
          style={styles.input}
          value={formData?.mobileNumber}
          placeholder="Enter your phone number"
          onChangeText={text => handleChange('mobileNumber', text)}
        />
        <Button
          mode="contained"
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          style={[styles.button, pressed && styles.buttonPressed]}
          labelStyle={styles.buttonLabel}
          onPress={handleSubmit}
          disabled={isPending}
          rippleColor="rgba(255, 255, 255, 0.3)">
          {isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.text}>Submit Info</Text>
          )}
        </Button>
      </View>
    </ScrollView>
  );
};

export default ProfileInfoScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f9f9f9',
  },
  profileRound: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#e0e0e0',
    marginBottom: 20,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
  },
  input: {
    backgroundColor: 'white',
  },
  button: {
    marginTop: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#222223',
  },
  buttonPressed: {
    backgroundColor: '#39373b',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
