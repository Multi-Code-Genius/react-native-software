import React, {useState} from 'react';
import {
  View,
  Image,
  Pressable,
  ScrollView,
  Text,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {VenueFormDetails} from '../../types/venue';

const MAX_IMAGES = 10;

interface Props {
  formData: VenueFormDetails;
  setFormData: React.Dispatch<React.SetStateAction<VenueFormDetails>>;
}

const EditImageUploadComponent: React.FC<Props> = ({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const images = formData?.images || [];

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
        if (response.didCancel) return;
        if (response.errorMessage) {
          Alert.alert('Error', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          if (uri && images.length < MAX_IMAGES) {
            const newImages = [...images, uri];
            setFormData((prev: any) => ({...prev, images: newImages}));
          }
        }
      },
    );
  };

  const removeImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setFormData((prev: any) => ({...prev, images: updatedImages}));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Images</Text>
      <View style={styles.imageGrid}>
        {images.map((img, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{uri: img}} style={styles.image} />
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

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
    borderStyle: 'dotted',
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    elevation: 2,
  },
  removeButtonText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  addButton: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  plusIcon: {
    fontSize: 24,
    color: 'gray',
  },
});
export default EditImageUploadComponent;
