import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import {useVerifyOtp} from '../api/auth';
import {useAuthStore} from '../store/authStore';
import {useRoute, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../context/ThemeContext';

const OtpVerificationScreen = () => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const route = useRoute();
  const navigation = useNavigation();
  const {phone} = route.params as {phone: string};
  const [otp, setOtp] = useState('');
  const {mutate: verifyOtp, isPending} = useVerifyOtp();
  const {saveToken} = useAuthStore();

  const handleVerifyOtp = () => {
    Keyboard.dismiss();
    verifyOtp(
      {phone, otp},
      {
        onSuccess: ({token}: {token: string}) => {
          setTimeout(async () => {
            if (token) {
              await saveToken(token);
            }
          }, 1500);
        },
      },
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../assets/SplashScreen.png')}
          style={styles.container}
          resizeMode="cover">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{flex: 1}}>
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
                  focusColor={theme.colors.primary}
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
                      borderWidth: 1,
                      borderColor: theme.colors.border,
                      borderRadius: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: theme.colors.background,
                    },
                    focusedPinCodeContainerStyle: {
                      borderColor: theme.colors.text,
                    },
                    pinCodeTextStyle: {
                      fontSize: 24,
                      color: theme.colors.text,
                      fontWeight: '600',
                    },
                  }}
                />
                <Text style={styles.text}>
                  we have sent the otp on +1216546
                </Text>
              </View>

              <View style={styles.buttonContainer}>
                <Text style={styles.resend}>
                  <Text style={styles.bold}>Resend</Text> OTP in 00:30 Sec
                </Text>

                <TouchableOpacity
                  style={[styles.button]}
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
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OtpVerificationScreen;

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    topcontainer: {
      height: '40%',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      gap: 2,
      padding: 24,
      borderBottomColor: '#3f3f3f',
      borderBottomWidth: 1,
    },
    text: {
      fontSize: 12,
      fontWeight: '500',
      fontFamily: 'Montserrat-Medium',
      color: '#888888',
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 24,
      backgroundColor: theme.colors.background,
    },
    formContainer: {
      flex: 1,
    },
    head: {
      color: 'white',
      fontFamily: 'ClashGrotesk-Medium',
      fontSize: 32,
      lineHeight: 46,
    },
    subtext: {
      fontSize: 12,
      color: '#FFFFFF',
      fontFamily: 'Montserrat-Light',
    },
    input: {
      flex: 1,
      paddingVertical: 8,
      backgroundColor: 'white',
    },
    label: {
      fontSize: 12,
      marginBottom: 8,
      fontFamily: 'Montserrat-SemiBold',
      color: theme.colors.text,
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
      backgroundColor: theme.colors.text1,
    },
    buttonText: {
      color: theme.colors.surface,
      fontSize: 16,
      fontFamily: 'Montserrat-SemiBold',
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
      marginBottom: 8,
      fontFamily: 'Montserrat-Regular',
      color: '#888888',
    },
    bold: {
      fontSize: 12,
      fontFamily: 'Montserrat-Regular',
      color: theme.colors.text,
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
