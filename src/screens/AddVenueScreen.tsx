import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAddVenue} from '../api/vanue';
import BasicDetailsComponent from '../components/BasicDetailsComponent';
import VenueDetails from '../components/VenueDetails';
import {useVenueStore} from '../store/useVenueStore';

const AddVenueScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const formData = useVenueStore(state => state.formData);
  const {mutate, isPending} = useAddVenue();

  // const validateStep = () => {
  //   if (currentStep === 0) {
  //     const {name, description, address, location} = formData;
  //     if (!name || !description || !address || !location?.area) {
  //       Alert.alert(
  //         'Validation Error',
  //         'Please fill all the required fields in Basic Details.',
  //       );
  //       return false;
  //     }
  //   }

  //   // if (currentStep === 1) {
  //   //   const {capacity, category, hourlyPrice, net, gameInfo} = formData;

  //   //   const isTurfTypeSelected =
  //   //     gameInfo?.indoor === 'true' ||
  //   //     gameInfo?.outdoor === 'true' ||
  //   //     gameInfo?.roof === 'true';

  //   //   if (
  //   //     !capacity ||
  //   //     !category ||
  //   //     !hourlyPrice ||
  //   //     !net ||
  //   //     !gameInfo?.surface ||
  //   //     !isTurfTypeSelected
  //   //   ) {
  //   //     Alert.alert(
  //   //       'Validation Error',
  //   //       'Please fill all the required fields in Venue Details.',
  //   //     );
  //   //     return false;
  //   //   }
  //   // }

  //   return true;
  // };

  const steps = [
    <BasicDetailsComponent key="step1" />,
    <VenueDetails key="step2" />,
  ];

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('All steps completed', formData);
      mutate(formData);
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
    marginBottom: 10,
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
