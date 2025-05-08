import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView, Text, TextInput, View} from 'react-native';
import {Button, Modal, Portal} from 'react-native-paper';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {twMerge} from 'tailwind-merge';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (data: any) => void;
}

const defaultValues = {
  name: '',
  number: '',
  date: '',
  startTime: '',
  endTime: '',
  nets: '',
  totalAmount: '',
};

export default function ModalForm({visible, onDismiss, onSubmit}: Props) {
  const {control, handleSubmit, reset} = useForm({defaultValues});
  const insets = useSafeAreaInsets();

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    reset();
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        style={{
          margin: 20,
        }}
        onDismiss={onDismiss}
        contentContainerStyle={{paddingBottom: insets.bottom}}>
        <View
          className="m-4 bg-white  rounded-2xl p-3 shadow-lg"
          style={{borderRadius: 20}}>
          <Text
            className="text-xl font-semibold text-center mb-4"
            style={{textAlign: 'center', fontWeight: 600, padding: 5}}>
            Booking Info
          </Text>
          <ScrollView
            contentContainerStyle={{paddingBottom: 16}}
            showsVerticalScrollIndicator={false}>
            {[
              {label: 'Name', name: 'name'},
              {
                label: 'Phone Number',
                name: 'number',
                keyboardType: 'phone-pad',
              },
              {label: 'Date', name: 'date', placeholder: 'YYYY-MM-DD'},
              {label: 'Start Time', name: 'startTime'},
              {label: 'End Time', name: 'endTime'},
              // {label: 'Nets', name: 'nets', keyboardType: 'number-pad'},
              {
                label: 'Total Amount',
                name: 'totalAmount',
                keyboardType: 'number-pad',
              },
            ].map(({label, name, keyboardType, placeholder}) => (
              <Controller
                key={name}
                name={name}
                control={control}
                render={({field: {onChange, value}}) => (
                  <View className="mb-3">
                    <Text className="text-gray-700 mb-1">{label}</Text>
                    <TextInput
                      placeholder={placeholder || label}
                      keyboardType={keyboardType || 'default'}
                      value={value}
                      onChangeText={onChange}
                      className={twMerge(
                        'border border-gray-300 rounded-xl px-4 py-2 text-base bg-white',
                        'focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500',
                      )}
                    />
                  </View>
                )}
              />
            ))}
          </ScrollView>

          <View className="flex-row justify-end mt-4">
            <Button onPress={onDismiss} mode="text">
              Cancel
            </Button>
            <Button
              onPress={handleSubmit(handleFormSubmit)}
              mode="contained"
              className="ml-2">
              Book
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
