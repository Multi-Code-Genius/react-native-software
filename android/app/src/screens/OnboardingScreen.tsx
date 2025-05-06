import React, {useRef, useState} from 'react';
import {Alert} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {useTheme} from 'react-native-paper';

import {useAuthStore} from '../store/authStore';
import {useRequestOtp, useVerifyOtp} from '../api/auth';

import WelcomeSlide from '../components/onboarding/WelcomeSlide';
import EmailLoginSlide from '../components/onboarding/EmailLoginSlide';
import OtpSlide from '../components/onboarding/OtpSlide';

const OnboardingScreen = () => {
  const [email, setEmail] = useState('');
  const [, setOtp] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const onboardingRef = useRef<Onboarding>(null);

  const {saveToken} = useAuthStore();
  const paperTheme = useTheme();

  const {mutate: requestOtp, isPending} = useRequestOtp();
  const {mutate: verifyOtp} = useVerifyOtp();

  const sendOtp = () => {
    if (!email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    requestOtp({email});
    onboardingRef.current?.goNext();
    setPageIndex(2);
  };

  return (
    <Onboarding
      ref={onboardingRef}
      containerStyles={{marginTop: '10%', justifyContent: 'flex-start'}}
      bottomBarHighlight={false}
      showNext={pageIndex !== 1}
      showSkip={false}
      showDone={pageIndex !== 1}
      pages={[
        WelcomeSlide(paperTheme),
        EmailLoginSlide({email, setEmail, sendOtp, isPending, paperTheme}),
        OtpSlide({email, setOtp, verifyOtp, saveToken, paperTheme}),
      ]}
    />
  );
};

export default OnboardingScreen;
