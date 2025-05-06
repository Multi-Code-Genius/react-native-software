import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import VenueDeatils from '../components/VenueDeatils';
import BasicDetailsComponent from '../components/BasicDetailsComponent';
import ImageUploder from '../components/ImageUploder';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAddVenue } from '../api/addvenuedetails';
import { addVenueStore } from '../store/addVenueStore';

const AddVenueScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const formData = addVenueStore(state => state.formData);
  const resetformData = addVenueStore(state => state.resetForm);
  console.log('formData', formData);
  const { mutate } = useAddVenue(
    data => {
      console.log('data', data);
      resetformData();
    },
    error => {
      console.error('Error creating venue:', error);
    },
  );

  const steps = [
    <BasicDetailsComponent key="step1" />,
    <VenueDeatils key="step2" />,
    <ImageUploder key="step3" />,
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
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <View className="flex-1 justify-between">
        <View className="flex-1">{steps[currentStep]}</View>

        <View className="flex-row justify-between mb-5">
          {currentStep > 0 && (
            <TouchableOpacity
              className="bg-blue-500 py-3 px-6 rounded"
              onPress={goPrevious}>
              <Text className="text-white font-bold">Previous</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            className="bg-blue-500 py-3 px-6 rounded ml-auto"
            onPress={goNext}>
            <Text className="text-white font-bold">
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
  },
});
