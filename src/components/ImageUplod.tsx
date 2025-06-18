import React, {useState} from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useVenueStore} from '../store/useVenueStore';
import {getStyles} from '../styles/ImageUploadStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../context/ThemeContext';

const MAX_IMAGES = 10;

const ImageUpload = () => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const [images, setImages] = useState<any[]>([]);
  const updateField = useVenueStore(state => state.updateField);

  const pickImage = async () => {
    try {
      ImagePicker.openPicker({
        width: 800,
        height: 600,
        cropping: false,
        multiple: false,
        mediaType: 'photo',
        compressImageQuality: 1,
      })
        .then(image => {
          const newImage = {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          };

          const newImages = [...images, newImage];
          setImages(newImages);
          updateField('images', newImages);
        })
        .catch(err => {
          console.log('Image pick error:', err);
        });
    } catch (error: any) {
      if (error.message !== 'User cancelled image selection') {
        Alert.alert('Error', error.message || 'Failed to pick image');
      }
    }
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
      <Text style={styles.label}>Venue Image</Text>
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
                backgroundColor: theme.colors.card,
                padding: 80,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: '#202020',
              }}>
              <Pressable onPress={pickImage} style={styles.backButton}>
                <Icon name="plus" size={24} color={theme.colors.surface} />
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ImageUpload;
