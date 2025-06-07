import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {OtpInput} from 'react-native-otp-entry';
import {useVerifyOtp} from '../api/auth';
import {useAuthStore} from '../store/authStore';
import {useRoute, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OtpVerificationScreen = () => {
  const paperTheme = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const {phone} = route.params as {phone: string};
  const [otp, setOtp] = useState('');
  const {mutate: verifyOtp, isPending} = useVerifyOtp();
  const {saveToken} = useAuthStore();

  const handleVerifyOtp = () => {
    verifyOtp(
      {phone, otp},
      {
        onSuccess: async ({token}: {token: string}) => {
          if (token) {
            await saveToken(token);
          }
        },
        onError: (error: any) => {
          Alert.alert('Verification Failed', error?.message || 'Try again.');
        },
      },
    );
  };

  return (
    <ImageBackground
      source={require('../assets/SplashScreen.png')}
      style={styles.container}
      resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.topcontainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.head}>Verify OTP</Text>
          <Text style={styles.subtext}>
            Quick verify and you're in the zone!
          </Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.label}>One Time Password</Text>
            <OtpInput
              numberOfDigits={4}
              focusColor={'#3a3939'}
              hideStick
              autoFocus
              onTextChange={text => {
                setOtp(text);
              }}
              theme={{
                containerStyle: {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                },
                pinCodeContainerStyle: {
                  width: 60,
                  height: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: '#3a3939',
                  backgroundColor: '#292828',
                },
                pinCodeTextStyle: {
                  fontSize: 24,
                  color: 'white',
                  fontWeight: '600',
                },
              }}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Text style={styles.resend}>Resend OTP in 00:30</Text>

            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: otp.length === 4 ? '#B2C000' : '#999'},
              ]}
              onPress={handleVerifyOtp}
              disabled={otp.length !== 4 || isPending}>
              {isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Verify OTP</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topcontainer: {
    height: '40%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    borderBottomColor: '#4C4C4C',
    borderBottomWidth: 1,
    gap: 2,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  formContainer: {
    flex: 1,
  },
  head: {
    color: 'white',
    fontSize: 32,
    fontWeight: '500',
    lineHeight: 46,
  },
  subtext: {
    fontSize: 12,
    fontWeight: '300',
    color: '#4C4C4C',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: '600',
    color: '#fff',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  buttonContainer: {
    paddingBottom: 14,
  },
  button: {
    paddingVertical: 18,
    backgroundColor: '#000',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  note: {
    fontSize: 12,
    fontWeight: '500',
    color: '#A0A0A0',
  },
  resend: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
