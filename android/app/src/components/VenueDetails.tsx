import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useVenueStore} from '../store/useVenueStore';
import CustomMultiselect from './CustomMultiselect';
import {SegmentedButtons} from 'react-native-paper';

const VenueDetails = () => {
  const updateField = useVenueStore(state => state.updateField);
  const formData = useVenueStore(state => state.formData);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(formData?.category || '');
  const [items, setItems] = useState([
    {label: 'Football', value: 'Football'},
    {label: 'Cricket', value: 'Cricket'},
    {label: 'Basketball', value: 'Basketball'},
  ]);
  // const [selectedTurfTypes, setSelectedTurfTypes] = useState<string[]>([]);
  const [selectedTurfType, setSelectedTurfType] = useState<string>('');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Text style={styles.label}>Capacity</Text>
        <View style={styles.inputWrapper}>
          <Icon
            name="account-group"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Capacity"
            onChangeText={text => updateField('capacity', text)}
            value={formData.capacity || ''}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Category</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select an option"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={styles.dropdownText}
          placeholderStyle={styles.dropdownPlaceholder}
          onChangeValue={text => updateField('category', text)}
          zIndex={10000}
          listMode="SCROLLVIEW"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Hourly Price</Text>
        <View style={styles.inputWrapper}>
          <Icon
            name="currency-inr"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Hourly Price"
            keyboardType="numeric"
            onChangeText={text => updateField('hourlyPrice', text)}
            value={formData.hourlyPrice || ''}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Turf Type</Text>
        <SegmentedButtons
          value={selectedTurfType}
          onValueChange={(selected: string) => {
            setSelectedTurfType(selected);

            const gameInfoUpdate = {
              indoor: selected === 'indoor' ? 'true' : 'false',
              outdoor: selected === 'outdoor' ? 'true' : 'false',
              roof: selected === 'roof' ? 'true' : 'false',
            };
            updateField('gameInfo', {...formData.gameInfo, ...gameInfoUpdate});
          }}
          buttons={[
            {value: 'indoor', label: 'Indoor'},
            {value: 'outdoor', label: 'Outdoor'},
            {value: 'roof', label: 'Roof'},
          ]}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Surface</Text>
        <View style={styles.inputWrapper}>
          <Icon name="texture-box" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Surface"
            onChangeText={text =>
              updateField('gameInfo', {...formData.gameInfo, surface: text})
            }
            value={formData.gameInfo?.surface || ''}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Net</Text>
        <View style={styles.inputWrapper}>
          <Icon name="tournament" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Turf Net"
            onChangeText={text => updateField('net', text)}
            value={formData.net || ''}
          />
        </View>
      </View>
    </ScrollView>
  );
};
export default VenueDetails;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f8fc',
    flex: 1,
  },
  content: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 0,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#444',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fafafa',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },
  turfContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  turfChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  turfChipSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginHorizontal: 5,
    fontWeight: '600',
  },
  illustration: {
    height: 120,
    width: '100%',
    resizeMode: 'contain',
    marginBottom: 20,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fafafa',
    minHeight: 45,
    zIndex: 1000,
  },

  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    zIndex: 1000,
  },

  dropdownText: {
    fontSize: 16,
    color: '#333',
  },

  dropdownPlaceholder: {
    color: '#999',
  },
});
