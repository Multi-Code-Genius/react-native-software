import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {Button, Dialog, Portal, useTheme} from 'react-native-paper';
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

  const theme = useTheme();

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={[styles.dialog, {backgroundColor: theme.colors.onPrimary}]}>
        <Dialog.Title>Booking Info</Dialog.Title>
        <Dialog.ScrollArea>
          <View
            style={[styles.scrollContent, {paddingBottom: insets.bottom + 16}]}>
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
          </View>
        </Dialog.ScrollArea>

        <Dialog.Actions
          style={{
            width: '100%',
          }}>
          <Button style={{width: '30%'}} onPress={onDismiss}>
            Cancel
          </Button>
          <Button
            style={{width: '30%'}}
            mode="contained"
            icon="checkmark-circle"
            onPress={handleSubmit(handleFormSubmit)}>
            Book
          </Button>
        </Dialog.Actions>
      </Dialog>

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
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 24,
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
});
