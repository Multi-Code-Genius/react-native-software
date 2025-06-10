import React, {useState} from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {useVenueStore} from '../store/useVenueStore';
import {styles} from '../styles/ImageUploadStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MAX_IMAGES = 10;

const ImageUpload = () => {
  const [images, setImages] = useState<Asset[]>([]);
  const updateField = useVenueStore(state => state.updateField);
  const {formData} = useVenueStore();
  console.log('fomrdata>>><<', formData);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES ||
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Image Permission',
          message: 'App needs access to your images',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission denied',
        'You need to allow permission to pick images.',
      );
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          Alert.alert('Error', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          if (asset.uri && images.length < MAX_IMAGES) {
            const newImages = [...images, asset];

            setImages(newImages);
            updateField('images', newImages);
          }
        }
      },
    );
  };

  const removeImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    updateField('images', updatedImages);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.head}>Image</Text>
      <Text style={styles.label}>venue Image</Text>
      <View style={styles.imageGrid}>
        {images.map((img, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{uri: img.uri}} style={styles.image} />
            <Pressable
              onPress={() => removeImage(index)}
              style={styles.removeButton}>
              <Text style={styles.removeButtonText}>×</Text>
            </Pressable>
          </View>
        ))}
        {images.length < MAX_IMAGES && (
          <View style={styles.card}>
            <View
              style={{
                width: '100%',
                backgroundColor: '#323232',
                padding: 80,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: '#202020',
              }}>
              <Pressable onPress={pickImage} style={styles.backButton}>
                <Icon name="plus" size={24} color="#000" />
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ImageUpload;
