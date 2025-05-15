import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Appbar,
  Button,
  IconButton,
  TextInput,
} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {useBookingById} from '../api/booking';
import {SafeAreaView} from 'react-native-safe-area-context';

const BookingByIdScreen = ({navigation}: any) => {
  const route = useRoute();
  const {bookingId} = route.params;
  const {data, isLoading} = useBookingById(bookingId);

  console.log('data>>>>', data);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (data?.booking) {
      setName(data.booking.user?.name || '');
      setPhone(data.booking.user?.mobileNumber || '');
      setAmount(data.booking.totalAmount?.toString() || '');
    }
  }, [data]);

  const formatTimeToAMPM = (isoString: string | number | Date) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['left', 'right']}>
      <View style={{flex: 1}}>
        <Appbar.Header
          style={{
            backgroundColor: 'white',
            borderBottomColor: '#e0e0e0',
            borderBottomWidth: 2,
          }}
          statusBarHeight={0}>
          <IconButton
            icon="arrow-back"
            iconColor={'black'}
            onPress={() => navigation.goBack()}
          />
          <Appbar.Content
            title={data?.booking?.user?.name || "Customer's Name"}
            titleStyle={{color: 'black'}}
          />
        </Appbar.Header>
        {isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator animating={true} size="small" />
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.form}>
              <TextInput
                label="Name"
                mode="outlined"
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                left={<TextInput.Icon icon="person" size={20} />}
              />

              <TextInput
                label="Phone Number"
                mode="outlined"
                keyboardType="phone-pad"
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                left={<TextInput.Icon icon="call" size={20} />}
              />

              <TextInput
                label="Total amount"
                mode="outlined"
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="Enter your total amount"
                left={<TextInput.Icon icon="cash" size={20} />}
              />

              <TextInput
                label="Start Time"
                mode="outlined"
                style={styles.input}
                value={formatTimeToAMPM(data?.booking?.startTime)}
                left={<TextInput.Icon icon="time" size={20} />}
                editable={false}
              />

              <TextInput
                label="End Time"
                mode="outlined"
                style={styles.input}
                value={formatTimeToAMPM(data?.booking?.endTime)}
                left={<TextInput.Icon icon="time" size={20} />}
                editable={false}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default BookingByIdScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },

  form: {
    gap: 16,
  },
  input: {
    backgroundColor: '#f9f9f9',
  },
});
