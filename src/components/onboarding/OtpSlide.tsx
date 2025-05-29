import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import {Text} from 'react-native-paper';

export default function OtpSlide({
  phone,
  setOtp,
  verifyOtp,
  saveToken,
  paperTheme,
}: {
  phone: string;
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
          Enter the OTP sent to your number
        </Text>
        <OtpInput
          numberOfDigits={4}
          focusColor={paperTheme.colors.primary}
          hideStick
          autoFocus
          onTextChange={text => {
            setOtp(text);
            if (text.length === 4) {
              verifyOtp(
                {phone, otp: text},
                {
                  onSuccess: async ({token}: {token: string}) => {
                    if (token) {
                      await saveToken(token);
                    }
                  },
                  onError: (error: any) => {
                    Alert.alert('Login Failed', error?.message || 'Try again.');
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
