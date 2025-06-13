import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomCheckbox from '../components/CustomCheckbox';
import {Button} from 'react-native-paper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/routes';

const BookingFormScreen = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={{flex: 1}}>
      <AppHeader isApp title="23 may 2025" />
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.card}>
            <Text style={styles.label}>Booking Name</Text>
            <View style={styles.inputWrapper}>
              <Icon
                name="person-outline"
                size={25}
                color="#717171"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter Booking Name"
                placeholderTextColor="#717171"
              />
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>Booking Number</Text>
            <View style={styles.inputWrapper}>
              <Icon
                name="call-outline"
                size={25}
                color="#717171"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter Booking Number"
                placeholderTextColor="#717171"
              />
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>Booking Mail</Text>
            <View style={styles.inputWrapper}>
              <Icon
                name="mail-outline"
                size={25}
                color="#717171"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter Booking Mail"
                placeholderTextColor="#717171"
              />
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.checkboxContainer}>
              <CustomCheckbox
                checked={isChecked}
                onToggle={() => setIsChecked(prev => !prev)}
                label="Send booking notification to user's mobile"
              />
            </View>
          </View>
        </View>
        <View style={styles.bottomCard}>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <Text style={styles.text}>Venue 1 , Vesu</Text>
            <Text style={styles.text1}>(Ground 1)</Text>
          </View>
          <View style={styles.bookingdetail}>
            <View style={styles.left}>
              <Text style={styles.title}>Booking Time</Text>
              <Text style={styles.subTitle}>06 am - 09 am</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.right}>
              <Text style={styles.title}>Booking Price</Text>
              <Text style={styles.subTitle}>₹ 3,000</Text>
            </View>
          </View>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate('BookingSuccess')}
            labelStyle={{fontWeight: 'bold', color: '#000'}}>
            Book Venue
          </Button>
        </View>
      </View>
    </View>
  );
};

export default BookingFormScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  card: {
    padding: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    color: '#B8B8B8',
  },
  form: {
    gap: 15,
    padding: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#272727',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: 'white',
    paddingVertical: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkboxLabel: {
    color: '#B8B8B8',
    fontSize: 14,
  },
  bottomCard: {
    backgroundColor: '#272727',
    padding: 15,
    gap: 20,
    flex: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  text1: {
    fontSize: 12,
    fontWeight: 'medium',
    color: '#888888',
  },
  bookingdetail: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#6c669b',
    marginVertical: 10,
  },
  title: {
    fontSize: 10,
    fontWeight: 'medium',
    color: '#B8B8B8',
    fontFamily: 'Montserrat-Regular',
  },
  subTitle: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'semibold',
  },
  left: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  right: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  button: {
    backgroundColor: '#B2C000',
    borderRadius: 0,
    color: '#000',
    paddingVertical: 10,
  },
  separator: {
    width: 1,
    borderRightWidth: 1,
    borderColor: '#fff',
    borderStyle: 'dashed',
    marginHorizontal: 10,
    alignSelf: 'stretch',
  },
});
