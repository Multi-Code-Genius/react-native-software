import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {ActivityIndicator, Appbar, Icon, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useBookingById} from '../api/booking';

const BookingByIdScreen = ({navigation}: any) => {
  const route = useRoute();
  const {bookingId} = route.params as {bookingId: string};
  const {data, isLoading} = useBookingById(bookingId);

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
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.iconContainer}>
                    <Icon source="person" size={20} color="#666" />
                  </View>

                  <TextInput
                    style={[styles.input]}
                    value={name}
                    onChangeText={setName}
                    editable={false}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.iconContainer}>
                    <Icon source="call" size={20} color="#666" />
                  </View>

                  <TextInput
                    style={[styles.input]}
                    value={phone}
                    onChangeText={setPhone}
                    editable={false}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Total amount</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.iconContainer}>
                    <Icon source="cash" size={20} color="#666" />
                  </View>

                  <TextInput
                    style={[styles.input]}
                    value={amount}
                    onChangeText={setAmount}
                    editable={false}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Start Time</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.iconContainer}>
                    <Icon source="time" size={20} color="#666" />
                  </View>
                  <TextInput
                    style={[styles.input]}
                    value={formatTimeToAMPM(data?.booking?.startTime)}
                    editable={false}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>End Time</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.iconContainer}>
                    <Icon source="time" size={20} color="#666" />
                  </View>

                  <TextInput
                    style={[styles.input]}
                    value={formatTimeToAMPM(data?.booking?.endTime)}
                    editable={false}
                  />
                </View>
              </View>
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
    gap: 7,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    gap: 10,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    fontSize: 13,
    paddingLeft: 40,
    flex: 1,
  },
  iconContainer: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
});
