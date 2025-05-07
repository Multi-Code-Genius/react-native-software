import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAddVenue} from '../api/vanue';
import BasicDetailsComponent from '../components/BasicDetailsComponent';
import ImageUpload from '../components/ImageUplod';
import VenueDetails from '../components/VenueDetails';
import {useVenueStore} from '../store/useVenueStore';

const AddVenueScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const formData = useVenueStore(state => state.formData);

  const {mutate} = useAddVenue();

  const steps = [
    <BasicDetailsComponent key="step1" />,
    <VenueDetails key="step2" />,
    <ImageUpload key="step3" />,
  ];

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('All steps completed');
      mutate(formData);
    }
  };

  const goPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <View className="flex-1 justify-between ">
        <View className="flex-1">{steps[currentStep]}</View>

        <View style={styles.container}>
          {currentStep > 0 && (
            <TouchableOpacity style={styles.input} onPress={goPrevious}>
              <Text style={styles.text}>Previous</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.input} onPress={goNext}>
            <Text style={styles.text}>
              {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Text>
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
    padding: 10,
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    width: '100%',
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
});
