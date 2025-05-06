import React, {useRef, useState} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import {TextInput, Button, Text, useTheme} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {OtpInput} from 'react-native-otp-entry';
import {useAuthStore} from '../store/authStore';
import {useRequestOtp, useVerifyOtp} from '../api/auth';

const OnboardingScreen = () => {
  const [email, setEmail] = useState('');
  const [, setOtp] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const onboardingRef = useRef<Onboarding>(null);
  const {saveToken} = useAuthStore();
  const paperTheme = useTheme();

  const {mutate, isPending} = useRequestOtp();
  const {mutate: verifyOtpMutate} = useVerifyOtp();

  const sendOtp = () => {
    if (!email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    mutate({email});
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
        {
          backgroundColor: paperTheme.dark ? '#000' : '#fff',
          image: (
            <LottieView
              autoPlay
              style={{width: 400, height: 400}}
              source={require('../assets/onBoard.json')}
            />
          ),
          title: "Hey there, glad you're here!",
          subtitle:
            "We're excited to show you what's possible. Let's dive in and get started!",
        },
        {
          backgroundColor: paperTheme.dark ? '#000' : '#fff',
          image: (
            <View
              className="w-full"
              style={{justifyContent: 'center', padding: 10, gap: 10}}>
              <View>
                <Text variant="headlineLarge">Login</Text>
                <Text variant="bodyMedium">
                  otp chaahiye? niche ka button daba. kisiko batane ka nahi otp
                  thik hai!
                </Text>
              </View>
              <TextInput
                label="Email"
                mode="outlined"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <Button
                mode="contained"
                onPress={sendOtp}
                loading={isPending}
                className="w-[50%] mx-auto">
                Send OTP
              </Button>
            </View>
          ),
          title: '',
          subtitle: '',
        },
        {
          backgroundColor: paperTheme.dark ? '#000' : '#fff',
          image: (
            <View style={styles.container}>
              <Text style={styles.title}>OTP</Text>
              <Text
                style={[styles.otpText, {color: paperTheme.colors.outline}]}>
                Enter the OTP sent to your email
              </Text>
              <OtpInput
                numberOfDigits={6}
                focusColor={paperTheme.colors.primary}
                autoFocus={false}
                hideStick={true}
                type="numeric"
                onTextChange={text => {
                  setOtp(text);
                  if (text.length === 6) {
                    verifyOtpMutate(
                      {email, otp: Number(text)},
                      {
                        onSuccess: async ({token}) => {
                          if (!token) {
                            return;
                          }
                          await saveToken(token);
                        },
                        onError: (error: any) => {
                          Alert.alert(
                            'Login Failed',
                            error?.message || 'Please try again.',
                          );
                        },
                      },
                    );
                  }
                }}
                theme={{
                  pinCodeTextStyle: {
                    color: paperTheme.colors.onBackground,
                  },
                }}
              />
            </View>
          ),
          title: '',
          subtitle: '',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    fontSize: 28,
    marginBottom: 12,
  },
  subtitle: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  otpText: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default OnboardingScreen;
