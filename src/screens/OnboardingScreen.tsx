import React, {useRef, useState} from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {useTheme} from 'react-native-paper';
import {useRequestOtp, useVerifyOtp} from '../api/auth';
import EmailLoginSlide from '../components/onboarding/EmailLoginSlide';
import OtpSlide from '../components/onboarding/OtpSlide';
import WelcomeSlide from '../components/onboarding/WelcomeSlide';
import {useAuthStore} from '../store/authStore';
import {Alert} from 'react-native';

const OnboardingScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const onboardingRef = useRef<Onboarding>(null);

  const {saveToken} = useAuthStore();
  const paperTheme = useTheme();

  const {mutate: requestOtp, isPending} = useRequestOtp();
  const {mutate: verifyOtp} = useVerifyOtp();

  const sendOtp = () => {
    if (!name || !phone) {
      Alert.alert('Missing Info', 'Please enter both your name and number.');
      return;
    }

    requestOtp(
      {name, phone},
      {
        onSuccess: () => {
          onboardingRef.current?.goNext();
          setPageIndex(2);
        },
        onError: (err: any) => {
          Alert.alert('OTP Error', err.message || 'Failed to send OTP.');
        },
      },
    );
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
        WelcomeSlide(),
        EmailLoginSlide({
          name,
          setName,
          phone,
          setPhone,
          sendOtp,
          isPending,
          paperTheme,
        }),
        OtpSlide({phone, setOtp, verifyOtp, saveToken, paperTheme}),
      ]}
    />
  );
};

export default OnboardingScreen;
