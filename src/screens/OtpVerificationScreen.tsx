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
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/SplashScreen.png')}
        style={styles.topcontainer}
        resizeMode="cover">
        <View style={styles.overlay}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.head}>OTP Verification</Text>
          <Text style={styles.subtext}>
            Quick verify and you're in the zone!
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>One Time Password</Text>
          <OtpInput
            numberOfDigits={4}
            focusColor={paperTheme.colors.primary}
            hideStick
            autoFocus
            onTextChange={text => {
              setOtp(text);
              if (text.length === 4) {
                handleVerifyOtp();
              }
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
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
              },
              focusedPinCodeContainerStyle: {
                borderColor: paperTheme.colors.primary,
              },
              pinCodeTextStyle: {
                fontSize: 24,
                color: paperTheme.colors.onBackground,
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
              {backgroundColor: otp.length === 4 ? '#000' : '#999'},
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
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topcontainer: {
    height: '40%',
  },
  overlay: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
    padding: 24,
    gap: 2,
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
    color: '#FFFFFF',
  },
  label: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: '600',
    color: '#000',
  },
  buttonContainer: {
    paddingBottom: 14,
  },
  button: {
    paddingVertical: 18,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
