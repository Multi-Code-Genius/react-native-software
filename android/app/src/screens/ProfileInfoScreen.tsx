import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, Alert, Image} from 'react-native';
import {
  TextInput,
  Text,
  Button,
  ActivityIndicator,
  IconButton,
} from 'react-native-paper';
import {useUpdateAccountInfo, useUploadImage} from '../api/account';
import {useRoute} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

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
    }
  }, []);

  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };
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
    <ScrollView contentContainerStyle={styles.container}>
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
  profileImageWrapper: {
    width: 140,
    height: 140,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#a7a0a0',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
