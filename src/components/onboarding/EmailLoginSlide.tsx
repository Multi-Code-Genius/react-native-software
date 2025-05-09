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
      <View style={{padding: 20}}>
        <View style={{gap: 16}}>
          <Text variant="headlineLarge" style={{textAlign: 'center'}}>
            Login
          </Text>

          <Text variant="bodyMedium" style={{textAlign: 'center'}}>
            OTP chaahiye? Niche ka button daba. Kisiko batane ka nahi OTP thik
            hai!
          </Text>

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
            style={{alignSelf: 'center', width: '50%'}}>
            Send OTP
          </Button>
        </View>
      </View>
    ),
    title: '',
    subtitle: '',
  };
}
