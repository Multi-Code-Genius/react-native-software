import React from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';

export default function EmailLoginSlide({
  email,
  setEmail,
  sendOtp,
  isPending,
  paperTheme,
}: {
  email: string;
  setEmail: (text: string) => void;
  sendOtp: () => void;
  isPending: boolean;
  paperTheme: any;
}) {
  return {
    backgroundColor: 'white',
    image: (
      <View
        className="w-full"
        style={{
          justifyContent: 'center',
          padding: 10,
          gap: 10,
        }}>
        <View>
          <Text variant="headlineLarge">Login</Text>
          <Text variant="bodyMedium">
            otp chaahiye? niche ka button daba. kisiko batane ka nahi otp thik
            hai!
          </Text>
        </View>
        <TextInput
          style={{height: 20, maxHeight: 60, backgroundColor: ''}}
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
  };
}
