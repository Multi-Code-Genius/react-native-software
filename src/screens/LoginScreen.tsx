import React, {useState} from 'react';
import {
  Alert,
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
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/types';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const {mutate: requestOtp, isPending} = useRequestOtp();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const isFormValid = phone.length === 10;

  const sendOtp = () => {
    if (!isFormValid) {
      Alert.alert(
        'Missing Info',
        'Please enter your name and a valid 10-digit number.',
      );
      return;
    }

    requestOtp(
      {phone, name},
      {
        onSuccess: () => {
          navigation.navigate('OtpVerify', {phone});
        },
        onError: (err: any) => {
          Alert.alert('OTP Error', err.message || 'Failed to send OTP.');
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
          <View style={styles.inputWrapper}>
            <Icon
              name="smartphone"
              size={20}
              color="#999"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your mobile number"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={10}
              value={phone}
              onChangeText={text => {
                const numericText = text.replace(/[^0-9]/g, '');
                if (numericText.length <= 10) {
                  setPhone(numericText);
                }
              }}
            />
          </View>

          <Text style={styles.note}>Use Email Address Instead</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: isFormValid ? '#000' : '#999',
              },
            ]}
            onPress={sendOtp}
            disabled={!isFormValid || isPending}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topcontainer: {
    height: '40%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    gap: 2,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  formContainer: {
    flex: 1,
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
    fontWeight: 'semibold',
    color: '#000',
    fontFamily: 'Montserrat-Regular',
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
  input: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: 'white',
    fontFamily: 'Montserrat-Regular',
    color: '#000',
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
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    fontWeight: 'semibold',
    textAlign: 'center',
  },
});

export default LoginScreen;
