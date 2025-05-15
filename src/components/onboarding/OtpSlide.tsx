import React from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {OtpInput} from 'react-native-otp-entry';

export default function OtpSlide({
  email,
  setOtp,
  verifyOtp,
  saveToken,
  paperTheme,
}: {
  email: string;
  setOtp: (text: string) => void;
  verifyOtp: any;
  saveToken: (token: string) => Promise<void>;
  paperTheme: any;
}) {
  return {
    backgroundColor: 'white',
    image: (
      <View style={styles.container}>
        <Text style={styles.title}>OTP</Text>
        <Text style={[styles.otpText, {color: paperTheme.colors.outline}]}>
          Enter the OTP sent to your email
        </Text>
        <OtpInput
          numberOfDigits={6}
          focusColor={paperTheme.colors.primary}
          autoFocus={false}
          hideStick={true}
          onTextChange={text => {
            setOtp(text);
            if (text.length === 6) {
              verifyOtp(
                {number: email, otp: text},
                {
                  onSuccess: async ({token}: {token: string}) => {
                    if (!token) return;
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
  };
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    fontSize: 28,
    marginBottom: 12,
  },
  otpText: {
    fontSize: 16,
    marginBottom: 16,
  },
});
