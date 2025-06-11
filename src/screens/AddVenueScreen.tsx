import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import StepIndicator from 'react-native-step-indicator';
import BasicDetailsComponent from '../components/BasicDetailsComponent';
import VenueDetails from '../components/VenueDetails';
import {useVenueStore} from '../store/useVenueStore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import VenueGround from '../components/VenueGround';
import LinearGradient from 'react-native-linear-gradient';
import ImageUpload from '../components/ImageUplod';
import {useVenueMutations} from '../api/vanue';

const AddVenueScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const {formData: form} = useVenueStore();
  const {createVenueMutation, uploadImagesMutation} = useVenueMutations();
  const navigation = useNavigation();
  const labels = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
  const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: '#B2C000',
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: '#B2C000',
    stepStrokeUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#B2C000',
    stepIndicatorUnFinishedColor: '#000',
    stepIndicatorCurrentColor: '#B2C000',
    stepIndicatorLabelCurrentColor: 'transparent',
    stepIndicatorLabelFinishedColor: 'transparent',
    stepIndicatorLabelUnFinishedColor: 'transparent',
    separatorFinishedColor: '#B2C000',
    separatorUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#B2C000',
  };

  const steps = [
    <BasicDetailsComponent key="step1" />,
    <VenueDetails key="step2" />,
    <VenueGround key="step3" />,
    <ImageUpload key="step4" />,
  ];

  const goNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('form', form);

      const images = form.images || [];
      try {
        const result = await createVenueMutation.mutateAsync(form);
        const venueId = result.venue?.id;

        if (venueId && images.length > 0) {
          const result2 = await uploadImagesMutation.mutateAsync({
            venueId,
            images,
          });
          console.log('Image Upload Success:', result2);
        }

        console.log('Venue Created:', result);
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  };

  const goPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ImageBackground
        source={require('../assets/Background.png')}
        resizeMode="cover"
        style={styles.image}>
        <View style={{flex: 1}}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Add Sports Venue</Text>
          </View>
          <View style={styles.stepIndicatorWrapper}>
            <Image
              source={require('../assets/shadow.png')}
              style={styles.shadow}
            />
            <LinearGradient
              colors={['transparent', '#B2C000', 'transparent']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={styles.glowBorder}
            />

            <View style={styles.stepIndicatorContainer}>
              <StepIndicator
                customStyles={customStyles}
                currentPosition={currentStep}
                labels={labels}
                stepCount={steps.length}
              />
            </View>
          </View>
          <View style={{flex: 1}}>{steps[currentStep]}</View>
          <View style={styles.container}>
            {currentStep !== 0 ? (
              <>
                <TouchableOpacity
                  style={[styles.disabledButton]}
                  onPress={goPrevious}>
                  <Text style={styles.text1}>Previous</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.input} onPress={goNext}>
                  <Text style={styles.text}>
                    {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={[styles.input, {width: '100%'}]}
                onPress={goNext}>
                <Text style={styles.text}>Next</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AddVenueScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#070707',
  },
  image: {
    flex: 1,
    width: '100%',
    // height: '30%',
  },
  stepIndicatorWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stepIndicatorContainer: {
    backgroundColor: '#121212',
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '90%',
    zIndex: 1,
  },
  glowBorder: {
    position: 'absolute',
    top: 0,
    width: 120,
    height: 1,
    alignSelf: 'center',
    zIndex: 2,
  },
  shadow: {
    position: 'absolute',
    width: '80%',
    bottom: -30,
    resizeMode: 'stretch',
    zIndex: 0,
  },
  container: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    margin: 'auto',
    width: '100%',
  },
  input: {
    backgroundColor: '#B2C000',
    paddingHorizontal: 24,
    paddingVertical: 18,
    marginVertical: 16,
    flex: 1,
  },
  disabledButton: {
    backgroundColor: '#3E4102',
    paddingHorizontal: 24,
    paddingVertical: 18,
    marginVertical: 16,
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  text1: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },

  headerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
