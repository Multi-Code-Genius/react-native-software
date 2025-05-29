import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import {ActivityIndicator, Button, Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useUpdateAccountInfo} from '../api/account';
import {styles} from '../styles/ProfileScreenStyles';

const ProfileInfoScreen = () => {
  const {params} = useRoute();
  const {data} = params as {data: any};
  const [pressed, setPressed] = useState(false);
  const {mutate: updateInfo, isPending} = useUpdateAccountInfo();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
  });

  useEffect(() => {
    if (data) {
      setFormData({
        email: data?.user?.email || '',
        name: data?.user?.name || '',
        phone: data?.user?.phone || '',
        address: data?.user?.address || '',
        city: data?.user?.city || '',
        state: data?.user?.state || '',
        zip_code: data?.user?.zip_code || '',
      });
    }
  }, []);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({
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

    const userId = data?.user?.id;

    if (!userId) {
      Alert.alert('Error', 'User ID not found.');
      return;
    }

    updateInfo(
      {id: userId, data: updateFields},
      {
        onSuccess: () =>
          Alert.alert('Success', 'Profile updated successfully!'),
        onError: (error: any) =>
          Alert.alert('Error', error?.message || 'Failed to update.'),
      },
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            <View style={styles.profileImageWrapper}></View>

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
                left={<TextInput.Icon icon="mail" size={20} />}
              />

              <TextInput
                label="Name"
                mode="outlined"
                style={styles.input}
                value={formData?.name}
                placeholder="Enter your name"
                onChangeText={text => handleChange('name', text)}
                left={<TextInput.Icon icon="person" size={20} />}
              />

              <TextInput
                label="Phone Number"
                mode="outlined"
                keyboardType="phone-pad"
                style={styles.input}
                value={formData?.phone}
                placeholder="Enter your phone number"
                onChangeText={text => handleChange('phone', text)}
                left={<TextInput.Icon icon="call" size={20} />}
              />
              <TextInput
                label="Address"
                mode="outlined"
                style={styles.input}
                value={formData?.address}
                placeholder="Enter your address"
                onChangeText={text => handleChange('address', text)}
                left={<TextInput.Icon icon="locate" size={20} />}
              />
              <TextInput
                label="City"
                mode="outlined"
                style={styles.input}
                value={formData?.city}
                placeholder="Enter your city"
                onChangeText={text => handleChange('city', text)}
                left={<TextInput.Icon icon="location" size={20} />}
              />
              <View style={styles.inputcontainer}>
                <TextInput
                  label="State"
                  mode="outlined"
                  style={styles.input2}
                  value={formData?.state}
                  placeholder="Enter your State"
                  onChangeText={text => handleChange('state', text)}
                  left={<TextInput.Icon icon="map" size={20} />}
                />
                <TextInput
                  label="Zipcode"
                  mode="outlined"
                  style={styles.input2}
                  value={formData?.zip_code}
                  placeholder="Enter your zipcode"
                  onChangeText={text => handleChange('zip_code', text)}
                  left={<TextInput.Icon icon="pin" size={20} />}
                />
              </View>

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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileInfoScreen;
