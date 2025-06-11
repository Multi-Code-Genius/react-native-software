import {BASE_URL} from '@env';
import React, {useState} from 'react';
import {
  View,
  Button,
  Image,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import {useAuthStore} from '../store/authStore';
import RNFS from 'react-native-fs';

export default function UploadScreen() {
  const [selectedImage, setSelectedImage] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 0,
    });
    if (response.didCancel || !response.assets) {
      return;
    }
    const asset = response.assets?.[0];
    if (asset) {
      setSelectedImage(asset);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage?.uri) {
      Alert.alert('No image selected');
      return;
    }

    const token = useAuthStore.getState().token;

    setLoading(true);

    try {
      const base64 = await RNFS.readFile(selectedImage.uri, 'base64');
      const base64Images = [`data:${selectedImage.type};base64,${base64}`];

      const res = await fetch(
        'http://192.168.100.140:1008/api/v2/venue/images/10',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({images: base64Images}),
        },
      );

      const responseText = await res.text();
      setLoading(false);

      if (res.status === 201) {
        Alert.alert('Success', responseText);
      } else {
        console.log('Upload failed:', responseText);
        Alert.alert('Failed', responseText);
      }
    } catch (err) {
      setLoading(false);
      console.error('Upload error:', err);
      Alert.alert('Error', 'Image upload failed. Check logs.');
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage?.uri && (
        <Image source={{uri: selectedImage.uri}} style={styles.image} />
      )}
      <Button title="Pick Image" onPress={pickImage} />
      <View style={{height: 20}} />
      <Button title="Upload" onPress={uploadImage} />
      {loading && <ActivityIndicator size="large" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  image: {width: 200, height: 200, marginBottom: 20, borderRadius: 10},
});

// import React, {useState} from 'react';
// import {Alert, Image, Pressable, ScrollView, Text, View} from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {useVenueMutations} from '../api/vanue';
// import {useVenueStore} from '../store/useVenueStore';
// import {styles} from '../styles/ImageUploadStyles';

// const MAX_IMAGES = 10;

// const ImageUpload = () => {
//   const [images, setImages] = useState<any[]>([]);
//   const updateField = useVenueStore(state => state.updateField);
//   const {uploadImagesMutation} = useVenueMutations();

//   const pickImage = async () => {
//     try {
//       ImagePicker.openPicker({
//         width: 800,
//         height: 600,
//         cropping: false,
//         multiple: false,
//         mediaType: 'photo',
//         compressImageQuality: 1,
//       })
//         .then(async image => {
//           const newImage = {
//             uri: image.path,
//             width: image.width,
//             height: image.height,
//             mime: image.mime,
//           };

//           const formData = new FormData();
//           formData.append('images', {
//             uri: image.path,
//             name: 'image.jpg',
//             type: image.mime,
//           });

//           const result2 = await uploadImagesMutation.mutateAsync({
//             venueId: 50,
//             images: formData,
//           });
//           console.log('result2', result2);
//           const newImages = [...images, newImage];
//           setImages(newImages);
//           updateField('images', newImages);
//         })
//         .catch(err => {
//           console.log('Image pick error:', err);
//         });
//     } catch (error: any) {
//       if (error.message !== 'User cancelled image selection') {
//         Alert.alert('Error', error.message || 'Failed to pick image');
//       }
//     }
//   };

//   const removeImage = (index: number) => {
//     const updatedImages = [...images];
//     updatedImages.splice(index, 1);
//     setImages(updatedImages);
//     updateField('images', updatedImages);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.head}>Image</Text>
//       <Text style={styles.label}>Venue Image</Text>
//       <View style={styles.imageGrid}>
//         {images.map((img, index) => (
//           <View key={index} style={styles.imageWrapper}>
//             <Image source={{uri: img.uri}} style={styles.image} />
//             <Pressable
//               onPress={() => removeImage(index)}
//               style={styles.removeButton}>
//               <Text style={styles.removeButtonText}>×</Text>
//             </Pressable>
//           </View>
//         ))}
//         {images.length < MAX_IMAGES && (
//           <View style={styles.card}>
//             <View
//               style={{
//                 width: '100%',
//                 backgroundColor: '#323232',
//                 padding: 80,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 borderWidth: 1,
//                 borderStyle: 'dashed',
//                 borderColor: '#202020',
//               }}>
//               <Pressable onPress={pickImage} style={styles.backButton}>
//                 <Icon name="plus" size={24} color="#000" />
//               </Pressable>
//             </View>
//           </View>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default ImageUpload;
