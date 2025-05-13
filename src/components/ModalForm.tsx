import React, {useEffect} from 'react';
import {Controller, useForm, useWatch} from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Button, Dialog, Portal, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {parseTimeTo24Hour} from '../helper/helper';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (data: any) => void;
  mode?: 'add' | 'edit';
  defaultValues?: any;
  price: string;
}

export default function ModalForm({
  visible,
  onDismiss,
  onSubmit,
  mode,
  defaultValues,
  price,
}: Props) {
  const defaultValues2 = {
    name: '',
    number: '',
    date: '',
    startTime: '',
    endTime: '',
    nets: 1,
    totalAmount: 0,
  };

  const {control, handleSubmit, reset, setValue} = useForm({
    defaultValues: defaultValues || {
      name: '',
      number: '',
      date: '',
      startTime: '',
      endTime: '',
      nets: 1,
      totalAmount: 0,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const insets = useSafeAreaInsets();

  const watchStartTime = useWatch({control, name: 'startTime'});
  const watchEndTime = useWatch({control, name: 'endTime'});

  useEffect(() => {
    if (!watchStartTime || !watchEndTime || !price) return;

    const convertTo24Hour = (timeStr: any) => {
      const clean = timeStr.replace(/[^\x00-\x7F]/g, '').trim();
      const [time, meridiem] = clean.split(/ (AM|PM)/i).filter(Boolean);
      const [hourStr, minuteStr] = time.split(':');

      let hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);

      if (meridiem?.toUpperCase() === 'PM' && hour !== 12) hour += 12;
      if (meridiem?.toUpperCase() === 'AM' && hour === 12) hour = 0;

      return {hour, minute};
    };

    try {
      const start = convertTo24Hour(watchStartTime);
      const end = convertTo24Hour(watchEndTime);

      const startMs = start.hour * 60 + start.minute;
      const endMs = end.hour * 60 + end.minute;

      const diffMinutes = endMs - startMs;
      if (diffMinutes <= 0) return;

      const durationHours = diffMinutes / 60;
      const total = Math.round(durationHours * Number(price));

      setValue('totalAmount', total);
    } catch (e: any) {
      console.warn('Invalid time format:', e.message);
    }
  }, [watchStartTime, watchEndTime, price, setValue]);

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

  const cancelBooking = () => {
    onDismiss();
    reset(defaultValues2);
  };

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

            <Controller
              name="totalAmount"
              control={control}
              render={({field: {value, onChange}}) => (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Total Amount</Text>
                  <TextInput
                    value={value.toString()}
                    onChangeText={text => onChange(Number(text))}
                    keyboardType="numeric"
                    style={styles.input}
                  />
                </View>
              )}
            />
          </View>
        </Dialog.ScrollArea>

        <Dialog.Actions
          style={{
            width: '100%',
          }}>
          <Button style={{width: '30%'}} onPress={cancelBooking}>
            Cancel
          </Button>
          <Button
            style={{width: '30%'}}
            mode="contained"
            icon={mode === 'edit' ? 'pencil' : 'checkmark-circle'}
            onPress={handleSubmit(handleFormSubmit)}>
            {mode === 'edit' ? 'Update' : 'Book'}
          </Button>
        </Dialog.Actions>
      </Dialog>

      <DatePicker
        modal
        open={openPicker}
        date={tempDate}
        minimumDate={
          pickerMode === 'time' && pickerField !== 'date'
            ? (() => {
                const selectedDate = control._formValues?.date;
                const startTimeRaw = control._formValues?.startTime;
                const now = new Date();

                if (!selectedDate) {
                  return new Date();
                }

                if (pickerField === 'endTime' && startTimeRaw) {
                  const startTime24 = parseTimeTo24Hour(startTimeRaw);
                  const startDateTime = new Date(
                    `${selectedDate}T${startTime24}`,
                  );

                  if (isNaN(startDateTime.getTime())) {
                    return now;
                  }

                  const minEndTime = new Date(
                    startDateTime.getTime() + 60 * 60 * 1000,
                  );

                  return minEndTime > now ? minEndTime : now;
                }

                const todayStr = now.toISOString().split('T')[0];
                if (selectedDate === todayStr) {
                  return now;
                }

                return undefined;
              })()
            : new Date()
        }
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
    paddingBottom: 16,
    paddingVertical: 10,
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
