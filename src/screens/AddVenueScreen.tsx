import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
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
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import VenueGround from '../components/VenueGround';
import LinearGradient from 'react-native-linear-gradient';
import ImageUpload from '../components/ImageUplod';
import {
  useEditVenueDetails,
  useGetVenueById,
  useVenueMutations,
} from '../api/vanue';
import {useTheme} from '../context/ThemeContext';
import {RootStackParamList} from '../navigation/routes';

const AddVenueScreen = () => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const isDark = theme.dark;
  const [currentStep, setCurrentStep] = useState(0);
  const {formData: form, resetForm, setFormData} = useVenueStore();
  const {createVenueMutation, uploadImagesMutation} = useVenueMutations();
  const editVenueMutation = useEditVenueDetails();
  const navigation = useNavigation();
  const labels = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
  const route = useRoute<RouteProp<RootStackParamList, 'Addvenue'>>();
  const {venueId} = route.params || {};
  const {data: venueData, isLoading, isError} = useGetVenueById(venueId);
  console.log('venueid>>>>', venueId);
  console.log('venueData>>>', venueData);

  useEffect(() => {
    if (venueId && venueData) {
      setFormData({
        name: venueData.venue.name || '',
        description: venueData.venue.description || '',
        category: venueData.venue.category || '',
        address: venueData.venue.address || '',
        location: {
          city: venueData.venue.location?.city || '',
          lat: venueData.venue.location?.lat || 0,
          lng: venueData.venue.location?.lng || 0,
          area: venueData.venue.location?.area || '',
        },
        gameInfo: {
          type: venueData.venue.game_info?.type || '',
          openingTime: venueData.venue.game_info?.openingTime || '',
          closingTime: venueData.venue.game_info?.closingTime || '',
        },
        ground_details: venueData.venue.ground_details || [],
      });
    }
  }, [venueId, venueData]);

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

  useFocusEffect(
    useCallback(() => {
      if (!venueId) {
        resetForm();
      }
    }, [venueId]),
  );
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
      const images = form?.images || [];

      try {
        let venueIdToUse = venueId;

        if (venueIdToUse) {
          const result = await editVenueMutation.mutateAsync({
            data: form,
            gameId: venueIdToUse,
          });

          resetForm();
          console.log('Venue Updated:', result);
        } else {
          const result = await createVenueMutation.mutateAsync(form);
          venueIdToUse = result.venue?.id;
          console.log('Venue Created:', result);
        }

        if (venueIdToUse && images.length > 0) {
          const result2 = await uploadImagesMutation.mutateAsync({
            venueId: venueIdToUse,
            images,
          });
          console.log('Image Upload Success:', result2);
        }
        resetForm();
      } catch (error) {
        console.error('Error:', error?.message);
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
        source={isDark && require('../assets/Background.png')}
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
              source={isDark && require('../assets/shadow.png')}
              style={styles.shadow}
            />
            {isDark && (
              <LinearGradient
                colors={['transparent', '#B2C000', 'transparent']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={styles.glowBorder}
              />
            )}

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

                <TouchableOpacity
                  disabled={uploadImagesMutation.isPending}
                  style={styles.input}
                  onPress={goNext}>
                  {currentStep === steps.length - 1 &&
                  uploadImagesMutation.isPending ? (
                    <ActivityIndicator />
                  ) : (
                    <Text style={styles.text}>
                      {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
                    </Text>
                  )}
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

const getStyles = (theme: any) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    image: {
      flex: 1,
      width: '100%',
    },
    stepIndicatorWrapper: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
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
      backgroundColor: theme.colors.text1,
      paddingHorizontal: 24,
      paddingVertical: 18,
      marginVertical: 16,
      flex: 1,
    },
    disabledButton: {
      backgroundColor: theme.colors.disable,
      paddingHorizontal: 24,
      paddingVertical: 18,
      marginVertical: 16,
      flex: 1,
    },
    text: {
      textAlign: 'center',
      fontFamily: 'Montserrat-SemiBold',
      color: theme.colors.surface,
    },
    text1: {
      textAlign: 'center',
      fontFamily: 'Montserrat-SemiBold',
      color: '#fff',
    },

    headerContainer: {
      paddingVertical: 20,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.header,
    },
    headerText: {
      fontSize: 20,
      fontFamily: 'Montserrat-SemiBold',
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
      // justifyContent: 'center',
      // alignItems: 'center',
      zIndex: 1,
    },
  });
