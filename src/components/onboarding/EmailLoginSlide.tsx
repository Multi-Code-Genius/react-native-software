import React from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';

export default function EmailLoginSlide({
  name,
  setName,
  phone,
  setPhone,
  sendOtp,
  isPending,
}: {
  name: string;
  setName: (text: string) => void;
  phone: string;
  setPhone: (text: string) => void;
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
            label="Name"
            mode="outlined"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            label="Phone Number"
            mode="outlined"
            keyboardType="numeric"
            autoCapitalize="none"
            maxLength={10}
            autoCorrect={false}
            value={phone}
            onChangeText={text => {
              const numericText = text.replace(/[^0-9]/g, '');
              if (numericText.length <= 10) {
                setPhone(numericText);
              }
            }}
          />

          <Button
            mode="contained"
            onPress={sendOtp}
            disabled={phone.length !== 10 || !name}
            loading={isPending}
            style={{
              alignSelf: 'center',
              width: '50%',
              backgroundColor:
                phone.length === 10 && name ? '#6200ee' : '#999999',
            }}
            textColor="white">
            Send OTP
          </Button>
        </View>
      </View>
    ),
    title: '',
    subtitle: '',
  };
}
