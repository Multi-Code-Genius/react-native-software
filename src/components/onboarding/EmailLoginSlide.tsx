import React from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';

export default function EmailLoginSlide({
  email,
  setEmail,
  sendOtp,
  isPending,
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
            label="Number"
            mode="outlined"
            keyboardType="numeric"
            style={{textTransform: 'none'}}
            autoCapitalize="none"
            maxLength={10}
            autoCorrect={false}
            value={email}
            onChangeText={text => {
              const numericText = text.replace(/[^0-9]/g, '');
              if (numericText.length <= 10) {
                setEmail(numericText);
              }
            }}
          />

          <Button
            mode="contained"
            onPress={sendOtp}
            disabled={email.length !== 10}
            loading={isPending}
            style={{
              alignSelf: 'center',
              width: '50%',
              backgroundColor: email.length === 10 ? '#6200ee' : '#999999',
            }}
            textColor={'white'}>
            Send OTP
          </Button>
        </View>
      </View>
    ),
    title: '',
    subtitle: '',
  };
}
