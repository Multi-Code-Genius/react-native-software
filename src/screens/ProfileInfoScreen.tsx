import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAccountInfo, useUpdateAccountInfo} from '../api/account';
import {styles} from '../styles/ProfileScreenStyles';
import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import {useToast} from '../context/ToastContext';
import {ActivityIndicator} from 'react-native-paper';

const ProfileInfoScreen = () => {
  const {data} = useAccountInfo();
  const {mutate: updateInfo, isPending} = useUpdateAccountInfo();
  const {showToast} = useToast();
  const [formData, setFormData] = useState({
    email: 'example@test.com',
    name: 'Hit Wicket Turf & Sports Club',
    phone: '847412357',
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
  }, [data]);

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
        onSuccess: () => {
          showToast({
            message: 'Profile updated successfully',
            showIcon: true,
            type: 'success',
          });
        },
        onError: (error: any) =>
          showToast({
            message: error.message,
            showIcon: true,
            type: 'error',
          }),
      },
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <AppHeader isApp title="Edit Profile" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            <View style={styles.form}>
              <View style={{flexDirection: 'column', gap: 10, width: '100%'}}>
                <Text style={styles.label}>Name</Text>
                <View style={styles.inputContainer}>
                  <Icon
                    name="person-outline"
                    size={20}
                    color="#fff"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    placeholderTextColor="#888"
                    value={formData?.name}
                    onChangeText={text => handleChange('name', text)}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'column', gap: 10}}>
                <Text style={styles.label}>Mobile</Text>
                <View style={styles.inputContainer}>
                  <Icon
                    name="phone-portrait"
                    size={20}
                    color="#fff"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#888"
                    value={formData?.phone}
                    placeholder="Enter your phone number"
                    onChangeText={text => handleChange('phone', text)}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'column', gap: 10}}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                  <Icon
                    name="mail-outline"
                    size={20}
                    color="#fff"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#888"
                    value={formData?.email}
                    placeholder="Enter your email"
                    onChangeText={text => handleChange('email', text)}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.buttoncontainer}>
            <TouchableOpacity
              disabled={isPending}
              style={styles.buttonBottom}
              onPress={handleSubmit}>
              {isPending ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.buttonText}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileInfoScreen;
