import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {useRequestOtp} from '../api/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/routes';
import {useTheme} from '../context/ThemeContext';

const LoginScreen = () => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [name, _] = useState('');
  const {mutate: requestOtp, isPending} = useRequestOtp();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const sendOtp = () => {
    if (!/^\d{10}$/.test(phone)) {
      setPhoneError('Please enter a valid 10‑digit mobile number');
      return;
    }
    setPhoneError('');
    requestOtp(
      {phone, name},
      {
        onSuccess: () => {
          setTimeout(() => {
            navigation.navigate('OtpVerify', {phone});
          }, 1500);
        },
      },
    );
  };

  return (
    <ImageBackground
      source={require('../assets/SplashScreen.png')}
      style={styles.container}
      resizeMode="cover">
      <View style={styles.topcontainer}>
        <Text style={styles.head}>Login or Signup</Text>
        <Text style={styles.subtext}>Run Your Turf Like a Pro.</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <View
            style={[
              styles.inputWrapper,
              phoneError && {borderColor: theme.colors.error},
            ]}>
            <Icon
              name="smartphone"
              size={20}
              color="#717171"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your mobile number"
              placeholderTextColor="#717171"
              keyboardType="numeric"
              maxLength={10}
              value={phone}
              onChangeText={text => {
                const numericText = text.replace(/[^0-9]/g, '');
                setPhone(numericText);
                if (phoneError) {
                  setPhoneError('');
                }
              }}
              onBlur={() => {
                if (!/^\d{10}$/.test(phone)) {
                  setPhoneError('Please enter a valid 10‑digit mobile number');
                }
              }}
            />
          </View>
          {!!phoneError && (
            <Text style={[styles.errorText, {color: theme.colors.error}]}>
              {phoneError}
            </Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={sendOtp}
            disabled={isPending}>
            {isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Send OTP</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

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
    contentContainer: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 24,
      backgroundColor: theme.colors.background,
    },
    formContainer: {
      flex: 1,
    },
    errorText: {
      fontSize: 12,
      marginTop: 4,
    },
    head: {
      color: 'white',
      fontFamily: 'ClashGrotesk-Regular',
      fontSize: 32,
      fontWeight: 'medium',
      lineHeight: 46,
    },
    subtext: {
      fontSize: 12,
      fontWeight: '300',
      fontFamily: 'Montserrat-Regular',
      color: '#FFFFFF',
    },
    label: {
      fontSize: 12,
      marginBottom: 4,
      color: theme.colors.text,
      fontWeight: '700',
      fontFamily: 'Montserrat-Regular',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surfcae,
      borderWidth: 1,
      borderColor: theme.colors.textSecondary,
      borderRadius: 4,
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginBottom: 16,
    },
    input: {
      flex: 1,
      paddingVertical: 8,
      backgroundColor: theme.colors.surfcae,
      color: theme.colors.text,
      fontFamily: 'Montserrat-Regular',
    },

    icon: {
      marginRight: 8,
    },
    note: {
      fontSize: 12,
      fontWeight: '500',
      color: '#A0A0A0',
      fontFamily: 'Montserrat-Regular',
    },
    buttonContainer: {
      paddingBottom: 14,
    },
    button: {
      paddingVertical: 18,
      borderRadius: 4,
      backgroundColor: theme.colors.primary,
    },
    buttonText: {
      color: theme.colors.background,
      fontFamily: 'Montserrat-Regular',
      fontSize: 16,
      fontWeight: '700',
      textAlign: 'center',
    },
  });

export default LoginScreen;
