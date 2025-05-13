import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEditVenueDetails, useGetVenueById} from '../api/vanue';
import EditBasicDetailsComponent from '../components/EditVenueDetails/EditBasicDetailsComponent';
import EditVenueDetailsComponent from '../components/EditVenueDetails/EditVenueDetailsComponent';
import EditImageUploadComponent from '../components/EditVenueDetails/EditImageUploadComponent';
import {defaultFormData, VenueFormDetails} from '../types/venue';

const EditVenueDetailsScreen = () => {
  const route = useRoute();
  const venueId = route.params as {id?: string};
  const {mutate, isPending} = useEditVenueDetails();
  const {data} = useGetVenueById(venueId?.id);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<VenueFormDetails>(defaultFormData);
  console.log('formData', formData);

  useEffect(() => {
    if (data && data.game) {
      const game = data.game;

      let turfType = '';
      if (game.gameInfo) {
        if (game.gameInfo.indoor === true || game.gameInfo.indoor === 'true')
          turfType = 'indoor';
        else if (
          game.gameInfo.outdoor === true ||
          game.gameInfo.outdoor === 'true'
        )
          turfType = 'outdoor';
        else if (game.gameInfo.roof === true || game.gameInfo.roof === 'true')
          turfType = 'roof';
      }

      setFormData({
        name: game.name || '',
        description: game.description || '',
        address: game.address || '',
        location: {
          area: game.location?.area || '',
          city: game.location?.city || '',
        },
        capacity: game.capacity ? String(game.capacity) : '',
        category: game.category || '',
        hourlyPrice: game.hourlyPrice ? String(game.hourlyPrice) : '',
        net: game.net ? String(game.net) : '',
        turfType: turfType,
        gameInfo: {
          surface: game.gameInfo?.surface || '',
          indoor: String(game.gameInfo?.indoor),
          outdoor: String(game.gameInfo?.outdoor),
          roof: String(game.gameInfo?.roof),
        },
        images: game.images || [],
      });
    }
  }, [data]);

  const steps = [
    <EditBasicDetailsComponent
      key="step1"
      formData={formData}
      setFormData={setFormData}
    />,
    <EditVenueDetailsComponent
      key="step2"
      formData={formData}
      setFormData={setFormData}
    />,
  ];

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('All steps completed');
      mutate({data: formData, gameId: venueId?.id});
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

export default EditVenueDetailsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    width: '100%',
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
