import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Modal, Portal } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { twMerge } from 'tailwind-merge';

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

export default function ModalForm({ visible, onDismiss, onSubmit }: Props) {
  const { control, handleSubmit, reset, setValue } = useForm({ defaultValues });
  const insets = useSafeAreaInsets();

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    reset();
    onDismiss();
  };

  const [openPicker, setOpenPicker] = React.useState(false);
  const [pickerMode, setPickerMode] = React.useState<'date' | 'time'>('date');
  const [pickerField, setPickerField] = React.useState<'date' | 'startTime' | 'endTime' | null>(null);
  const [tempDate, setTempDate] = React.useState<Date>(new Date());

  const openFieldPicker = (
    mode: 'date' | 'time',
    field: 'date' | 'startTime' | 'endTime'
  ) => {
    setPickerMode(mode);
    setPickerField(field);
    setTempDate(new Date());
    setOpenPicker(true);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        style={{ margin: 20 }}
        onDismiss={onDismiss}
        contentContainerStyle={{ paddingBottom: insets.bottom }}>
        <View
          className="w-full mx-auto m-4 bg-white rounded-2xl p-3 shadow-lg"
          style={{ borderRadius: 20 }}>
          <Text
            className="text-xl font-semibold text-center mb-4"
            style={{ textAlign: 'center', fontWeight: '600', padding: 5 }}>
            Booking Info
          </Text>

          <ScrollView
            contentContainerStyle={{ paddingBottom: 16 }}
            showsVerticalScrollIndicator={false}>
            {[
              { label: 'Name', name: 'name' },
              {
                label: 'Phone Number',
                name: 'number',
                keyboardType: 'phone-pad',
              },
              {
                label: 'Total Amount',
                name: 'totalAmount',
                keyboardType: 'number-pad',
              },
            ].map(({ label, name, keyboardType }) => (
              <Controller
                key={name}
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <View className="mb-3 px-3">
                    <Text className="text-gray-700 mb-1">{label}</Text>
                    <TextInput
                      placeholder={label}
                      keyboardType={keyboardType || 'default'}
                      value={value}
                      onChangeText={onChange}
                      className={twMerge(
                        'border border-gray-300 rounded-xl px-4 py-2 text-base bg-white',
                        'focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                      )}
                    />
                  </View>
                )}
              />
            ))}

            <Controller
              name="date"
              control={control}
              render={({ field: { onChange, value } }) => (
                <View className="mb-3 px-3">
                  <Text className="text-gray-700 mb-1">Date</Text>
                  <TouchableOpacity
                    onPress={() => openFieldPicker('date', 'date')}
                    className={twMerge(
                      'border border-gray-300 rounded-xl px-4 py-2 bg-white'
                    )}>
                    <Text className="text-base text-gray-800">
                      {value || 'Select Date'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />

            <Controller
              name="startTime"
              control={control}

              render={({ field: { onChange, value } }) => (
                <View className="mb-3 px-3">
                  <Text className="text-gray-700 mb-1">Start Time</Text>
                  <TouchableOpacity
                    onPress={() => openFieldPicker('time', 'startTime')}
                    className={twMerge(
                      'border border-gray-300 rounded-xl px-4 py-2 bg-white'
                    )}>
                    <Text className="text-base text-gray-800">
                      {value || 'Select Start Time'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />

            <Controller
              name="endTime"
              control={control}
              render={({ field: { onChange, value } }) => (
                <View className="mb-3 px-3">
                  <Text className="text-gray-700 mb-1">End Time</Text>
                  <TouchableOpacity
                    onPress={() => openFieldPicker('time', 'endTime')}
                    className={twMerge(
                      'border border-gray-300 rounded-xl px-4 py-2 bg-white'
                    )}>
                    <Text className="text-base text-gray-800">
                      {value || 'Select End Time'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
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

        <DatePicker
          modal
          open={openPicker}
          date={tempDate}
          mode={pickerMode}
          minuteInterval={30}
          onConfirm={(date) => {
            setOpenPicker(false);
            const formatted =
              pickerMode === 'date'
                ? date.toISOString().split('T')[0]
                : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            setValue(pickerField!, formatted);
          }}
          onCancel={() => setOpenPicker(false)}
        />
      </Modal>
    </Portal>
  );
}
