import React, {useState} from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getStyles} from '../styles/VenueDetailsStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {useVenueStore} from '../store/useVenueStore';
import {useTheme} from '../context/ThemeContext';

const MAX_IMAGES = 10;
const VenueImage = () => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
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
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.head}>Image</Text>

      <View style={styles.card}>
        <Text style={styles.label}>venue Image</Text>
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
          <TouchableOpacity style={styles.backButton} onPress={pickImage}>
            <Icon name="plus" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default VenueImage;
