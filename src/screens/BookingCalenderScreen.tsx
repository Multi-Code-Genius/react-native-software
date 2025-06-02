import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Keyboard, ScrollView, TouchableOpacity, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import debounce from 'lodash/debounce';

import {
  useBookingInfo,
  useCreateBooking,
  useSuggestedCustomer,
} from '../api/booking';
import BookingScreenAppBar from '../components/BookingScreen/BookingScreenAppBar';
import {styles} from '../components/BookingScreen/BookingScreenStyles';
import {useBookingFormStore} from '../store/useBookingFormStore';
import {calculatedAmount} from '../hooks/useCalculatedAmount';
import CalendarComponent from '../components/BookingScreen/CalendarComponent';

interface BookingCalenderScreenProps {
  navigation: any;
}

const BookingCalenderScreen = ({navigation}: BookingCalenderScreenProps) => {
  const [initialDate, setInitialDate] = useState(moment().format('DD-MM-YYYY'));

  const route = useRoute();
  const {venueId} = route.params as {venueId: string};
  const {price} = route.params as {price: string};

  console.log('price>>>', price);
  const {
    name,
    phone,
    totalAmount,
    startTime,
    endTime,
    bookedGrounds,
    setName,
    setPhone,
    setTotalAmount,
    setBookedGrounds,
    resetForm,
  } = useBookingFormStore();
  const [localNumber, setLocalNumber] = useState(phone);

  useEffect(() => {
    if (!startTime || !endTime || !price) {
      return;
    }

    const result = calculatedAmount(startTime, endTime, price);
    if (result) {
      setTotalAmount(result);
    }
  }, [startTime, endTime, price, setTotalAmount]);
  const {refetch} = useBookingInfo({
    gameId: venueId,
    date: initialDate,
  });
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['70%'];

  const {mutate, isPending} = useCreateBooking();

  const newdate = moment.utc(initialDate, 'DD-MM-YYYY').startOf('day').format();

  console.log('newdate>>>', newdate);
  console.log(
    'newdate local:',
    moment(initialDate, 'DD-MM-YYYY').startOf('day').format(),
  );
  console.log(
    'newdate utc:',
    moment(initialDate, 'DD-MM-YYYY').utc().startOf('day').format(),
  );

  const handleBookingSubmit = () => {
    if (
      !name ||
      !phone ||
      !totalAmount ||
      !startTime ||
      !endTime ||
      !bookedGrounds
    ) {
      console.warn('Please fill in all fields and select a time slot.');
      return;
    }

    Keyboard.dismiss();
    mutate(
      {
        name,
        phone,
        bookedGrounds: parseInt(bookedGrounds, 10),
        totalAmount: parseFloat(totalAmount),
        venueId: venueId,
        startTime: moment(`${initialDate} ${startTime}`, 'DD-MM-YYYY hh:mm A')
          .utc()
          .format(),
        endTime: moment(`${initialDate} ${endTime}`, 'DD-MM-YYYY hh:mm A')
          .utc()
          .format(),
        date: newdate,
      },
      {
        onSuccess: () => {
          refetch();
          resetForm();
          setLocalNumber('');
          bottomSheetRef.current?.close();
        },
        onError: error => {
          console.error('Booking failed:', error);
        },
      },
    );
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setPhone(value);
      }, 500),
    [],
  );

  const handleNumberChange = (value: string) => {
    setLocalNumber(value);
    debouncedSearch(value);
  };

  const {data: customerData, isLoading: customerLoading} =
    useSuggestedCustomer(phone);

  console.log('customerData', customerData?.customers);

  return (
    <View style={styles.container}>
      <BookingScreenAppBar navigation={navigation} />

      <CalendarComponent
        navigation={navigation}
        bottomSheetRef={bottomSheetRef}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        keyboardBehavior="fillParent"
        enableDynamicSizing={false}
        backdropComponent={renderBackdrop}>
        <BottomSheetView style={styles.sheetContent}>
          <View style={styles.formContainer}>
            <View style={styles.headerRow}>
              <Text variant="bodyLarge">
                Date: {moment(initialDate, 'DD-MM-YYYY').format('Do MMM YYYY')}
              </Text>
              <Text variant="bodyLarge">
                Booking for slot: {startTime} - {endTime}
              </Text>
            </View>
            <View style={{position: 'relative', zIndex: 10}}>
              <BottomSheetTextInput
                placeholderTextColor="#888"
                placeholder="Phone Number (e.g., +1 234 567 890)"
                onSubmitEditing={Keyboard.dismiss}
                value={localNumber}
                onChangeText={handleNumberChange}
                keyboardType="phone-pad"
                style={styles.input}
                underlineColorAndroid="transparent"
              />

              {!customerLoading &&
                customerData?.customers?.length > 0 &&
                (() => {
                  const filteredCustomers = customerData.customers.filter(
                    cust => cust.user.phone !== localNumber,
                  );

                  if (filteredCustomers.length === 0) return null;

                  return (
                    <View
                      style={{
                        position: 'absolute',
                        top: 50,
                        left: 0,
                        right: 0,
                        backgroundColor: '#fff',
                        borderWidth: filteredCustomers.length > 0 ? 1 : 0,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        maxHeight: 150,
                        zIndex: 999,
                      }}>
                      <ScrollView keyboardShouldPersistTaps="handled">
                        {filteredCustomers.map((cust, i) => (
                          <TouchableOpacity
                            key={i}
                            style={{
                              paddingVertical: 10,
                              paddingHorizontal: 16,
                              borderBottomWidth:
                                i !== filteredCustomers.length - 1 ? 1 : 0,
                              borderBottomColor: '#eee',
                            }}
                            onPress={() => {
                              setName(cust.user.name);
                              setPhone(cust.user.mobileNumber);
                              setLocalNumber(cust.user.mobileNumber);
                              Keyboard.dismiss();
                            }}>
                            <Text style={{fontSize: 14}}>
                              {cust.user.name} - {cust.user.mobileNumber}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  );
                })()}

              {!customerLoading && customerData?.customers?.length === 0 && (
                <Text
                  style={{paddingHorizontal: 16, color: '#888', marginTop: 8}}>
                  No matching customers found.
                </Text>
              )}
            </View>

            <BottomSheetTextInput
              placeholderTextColor="#888"
              placeholder="Full Name (e.g., John Doe)"
              value={name}
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={setName}
              style={styles.input}
            />

            <BottomSheetTextInput
              onSubmitEditing={Keyboard.dismiss}
              placeholderTextColor="#888"
              placeholder="Amount (e.g., 250.00)"
              value={totalAmount}
              onChangeText={setTotalAmount}
              keyboardType="numeric"
              style={styles.input}
            />
            <BottomSheetTextInput
              onSubmitEditing={Keyboard.dismiss}
              placeholderTextColor="#888"
              placeholder="Grounds"
              value={bookedGrounds}
              onChangeText={setBookedGrounds}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>

          <Button
            mode="contained"
            onPress={handleBookingSubmit}
            loading={isPending}
            disabled={isPending}
            style={{
              backgroundColor: isPending ? '#ccc' : 'black',
            }}
            textColor={isPending ? 'black' : undefined}>
            Book Slot
          </Button>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default BookingCalenderScreen;
