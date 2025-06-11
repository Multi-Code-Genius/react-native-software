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
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/routes';

const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const {mutate: requestOtp, isPending} = useRequestOtp();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const isFormValid = phone.length === 10 && name.length > 0;

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
                backgroundColor: isFormValid ? '#B2C000' : '#B2C000',
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
    borderBottomColor: '#3f3f3f',
    borderBottomWidth: 1,
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
    color: '#fff',
    fontWeight: 'semibold',
    fontFamily: 'Montserrat-Regular',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#323232',
    borderWidth: 1,
    borderColor: '#3f3e3e',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: '#323232',
    color: '#fff',
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
  },
  buttonText: {
    color: 'black',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    fontWeight: 'semibold',
    textAlign: 'center',
  },
});

export default LoginScreen;
