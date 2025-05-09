import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {Button, Modal, Portal} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Controller, useForm} from 'react-hook-form';

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
  nets: 1,
  totalAmount: 0,
};

export default function ModalForm({visible, onDismiss, onSubmit}: Props) {
  const {control, handleSubmit, reset, setValue} = useForm({defaultValues});
  const insets = useSafeAreaInsets();

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    reset();
    onDismiss();
  };

  const [openPicker, setOpenPicker] = React.useState(false);
  const [pickerMode, setPickerMode] = React.useState<'date' | 'time'>('date');
  const [pickerField, setPickerField] = React.useState<
    'date' | 'startTime' | 'endTime' | null
  >(null);
  const [tempDate, setTempDate] = React.useState<Date>(new Date());

  const openFieldPicker = (
    mode: 'date' | 'time',
    field: 'date' | 'startTime' | 'endTime',
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
        style={styles.modal}
        onDismiss={onDismiss}
        contentContainerStyle={{paddingBottom: insets.bottom}}>
        <View style={styles.container}>
          <Text style={styles.title}>Booking Info</Text>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {[
              {label: 'Name', name: 'name'},
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
            ].map(({label, name, keyboardType}) => (
              <Controller
                key={name}
                name={name}
                control={control}
                render={({field: {onChange, value}}) => (
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>{label}</Text>
                    <TextInput
                      placeholder={label}
                      keyboardType={keyboardType || 'default'}
                      value={value}
                      onChangeText={onChange}
                      style={styles.input}
                    />
                  </View>
                )}
              />
            ))}

            {['date', 'startTime', 'endTime'].map(field => (
              <Controller
                key={field}
                name={field}
                control={control}
                render={({field: {onChange, value}}) => (
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>
                      {field === 'date'
                        ? 'Date'
                        : field === 'startTime'
                        ? 'Start Time'
                        : 'End Time'}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        openFieldPicker(
                          field === 'date' ? 'date' : 'time',
                          field as any,
                        )
                      }
                      style={styles.pickerButton}>
                      <Text style={styles.pickerText}>
                        {value ||
                          `Select ${
                            field === 'date'
                              ? 'Date'
                              : field === 'startTime'
                              ? 'Start Time'
                              : 'End Time'
                          }`}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            ))}
          </ScrollView>

          <View style={styles.buttonRow}>
            <Button onPress={onDismiss} mode="text">
              Cancel
            </Button>
            <Button onPress={handleSubmit(handleFormSubmit)} mode="contained">
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
          onConfirm={date => {
            setOpenPicker(false);
            const formatted =
              pickerMode === 'date'
                ? date.toISOString().split('T')[0]
                : date.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  });
            setValue(pickerField!, formatted);
          }}
          onCancel={() => setOpenPicker(false)}
        />
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 20,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    margin: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
    color: '#374151',
    fontSize: 14,
  },
  input: {
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: 'white',
  },
  pickerButton: {
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  pickerText: {
    fontSize: 16,
    color: '#1F2937',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 16,
  },
});
