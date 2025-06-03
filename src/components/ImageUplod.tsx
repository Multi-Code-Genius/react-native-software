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

const MAX_IMAGES = 10;

const ImageUpload = () => {
  const [images, setImages] = useState<Asset[]>([]);
  const updateField = useVenueStore(state => state.updateField);

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
      <Text style={styles.heading}>Images</Text>
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
          <Pressable onPress={pickImage} style={styles.addButton}>
            <Text style={styles.plusIcon}>+</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
};

export default ImageUpload;
