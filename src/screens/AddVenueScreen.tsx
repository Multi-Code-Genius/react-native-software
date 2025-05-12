import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useCreateGame} from '../api/vanue';
import BasicDetailsComponent from '../components/BasicDetailsComponent';
import ImageUpload from '../components/ImageUplod';
import VenueDetails from '../components/VenueDetails';
import {useAuthStore} from '../store/authStore';
import {useVenueStore} from '../store/useVenueStore';

const AddVenueScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const formData = useVenueStore(state => state.formData);

  const {mutate: createGameMutate, isPending} = useCreateGame(
    data => console.log('Success:', data),
    error => console.log('Error:', error.message),
  );

  const validateStep = () => {
    if (currentStep === 0) {
      const {name, description, address, location} = formData;
      if (!name || !description || !address || !location?.area) {
        Alert.alert(
          'Validation Error',
          'Please fill all the required fields in Basic Details.',
        );
        return false;
      }
    }

    if (currentStep === 1) {
      const {capacity, category, hourlyPrice, net, gameInfo} = formData;

      const isTurfTypeSelected =
        gameInfo?.indoor === 'true' ||
        gameInfo?.outdoor === 'true' ||
        gameInfo?.roof === 'true';

      if (
        !capacity ||
        !category ||
        !hourlyPrice ||
        !net ||
        !gameInfo?.surface ||
        !isTurfTypeSelected
      ) {
        Alert.alert(
          'Validation Error',
          'Please fill all the required fields in Venue Details.',
        );
        return false;
      }
    }

    return true;
  };

  const steps = [
    <BasicDetailsComponent key="step1" />,
    <VenueDetails key="step2" />,
    <ImageUpload key="step3" />,
  ];

  const goNext = () => {
    if (!validateStep()) {
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('All steps completed');

      const images = formData.images?.filter(img => img?.uri) || [];

      createGameMutate({
        name: formData?.name!,
        category: formData.category!,
        description: formData.description!,
        hourlyPrice: 23,
        capacity: 45,
        net: 1,
        token: useAuthStore.getState().token || '',
        location: {
          city: formData.location?.city!,
          area: formData.location?.area!,
          address: formData.address!,
        },
        gameInfo: {
          surface: formData.gameInfo?.surface!,
          indoor: !!formData.gameInfo?.indoor!,
          outdoor: !!formData.gameInfo?.indoor!,
          roof: !!formData.gameInfo?.roof!,
          equipmentProvided: false,
        },
        images: images.map((img, index) => ({
          uri: img.uri,
          name: img.fileName || `image_${index}.jpg`,
          type: img.type || 'image/jpeg',
        })),
      });
    }
  };

  const goPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['left', 'right']}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>{steps[currentStep]}</View>

        <View style={styles.container}>
          <TouchableOpacity
            style={[styles.input, currentStep === 0 && styles.disabledButton]}
            onPress={goPrevious}
            disabled={currentStep === 0}>
            <Text style={styles.text}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.input]}
            onPress={goNext}
            disabled={isPending}>
            {isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.text}>
                {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddVenueScreen;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    margin: 'auto',
    width: '95%',
    borderRadius: 10,
    elevation: 10,
  },
  input: {
    backgroundColor: 'black',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
    marginVertical: 16,
    width: '50%',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
});
