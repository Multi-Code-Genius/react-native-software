import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {
  ActivityIndicator,
  Button,
  IconButton,
  Text,
  TextInput,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useUpdateAccountInfo, useUploadImage} from '../api/account';

const ProfileInfoScreen = () => {
  const {params} = useRoute();
  const {data} = params as {data: any};
  const [pressed, setPressed] = useState(false);
  const [profilePicUri, setProfilePicUri] = useState(
    data?.user?.profile_pic || '',
  );
  const {mutate: updateInfo, isPending} = useUpdateAccountInfo();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    mobileNumber: '',
  });
  const userId = data?.user?.id;

  useEffect(() => {
    if (data) {
      setFormData({
        email: data?.user?.email || '',
        name: data?.user?.name || '',
        mobileNumber: data?.user?.mobileNumber || '',
      });
      setProfilePicUri(data?.user?.profile_pic || '');
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

    updateInfo(updateFields, {
      onSuccess: () => Alert.alert('Success', 'Profile updated successfully!'),
      onError: (error: any) =>
        Alert.alert('Error', error?.message || 'Failed to update.'),
    });
  };

  const uploadImageMutation = useUploadImage(
    res => {
      if (!res?.user) {
        Alert.alert('Upload failed', 'Invalid response from server');
        return;
      }
      setProfilePicUri(res.user.profile_pic);
      Alert.alert('Success', 'Profile image uploaded successfully');
    },
    error => {
      Alert.alert('Error', 'Image upload failed');
      console.log('Upload error:', error);
    },
  );

  const handleMediaPick = () => {
    if (!userId) return;

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      avoidEmptySpaceAroundImage: true,
    })
      .then((image: {path: any; mime: any}) => {
        const formData = new FormData();
        formData.append('profile_pic', {
          uri: image.path,
          name: 'image.jpg',
          type: image.mime,
        });

        uploadImageMutation.mutate({
          id: userId,
          payload: formData,
        });
      })
      .catch(err => {
        console.log('Image pick error:', err);
      });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            <View style={styles.profileImageWrapper}>
              <Image
                source={{uri: profilePicUri}}
                style={styles.profileImage}
                resizeMode="cover"
              />
              <IconButton
                icon="pencil"
                size={16}
                onPress={handleMediaPick}
                iconColor="#fff"
                style={styles.iconOverlay}
              />
            </View>

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
                value={formData?.mobileNumber}
                placeholder="Enter your phone number"
                onChangeText={text => handleChange('mobileNumber', text)}
                left={<TextInput.Icon icon="call" size={20} />}
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileInfoScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },
  profileImageWrapper: {
    width: 140,
    height: 140,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#a7a0a0',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  iconOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: '#f9f9f9',
  },
  button: {
    marginTop: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#222223',
    elevation: 2,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
