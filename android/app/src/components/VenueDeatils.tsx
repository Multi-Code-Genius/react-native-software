import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomMultiselect from './CustomMultiselect';
import {TextInput} from 'react-native-paper';
import {addVenueStore} from '../store/addVenueStore';
import DropDownPicker from 'react-native-dropdown-picker';

const VenueDeatils = () => {
  const updateField = addVenueStore(state => state.updateField);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Football', value: 'Football'},
    {label: 'Cricket', value: 'Cricket'},
    {label: 'Basketball', value: 'Basketball'},
  ]);
  const [selectedTurfTypes, setSelectedTurfTypes] = useState<string[]>([]);

  const turfOptions = [
    {label: 'Indoor', value: 'indoor'},
    {label: 'Outdoor', value: 'outdoor'},
    {label: 'Roof', value: 'roof'},
  ];

  return (
    <View className="w-full p-2 flex gap-4">
      <View className="gap-3">
        <Text className="text-xl font-bold">Capacity</Text>
        <TextInput
          mode="flat"
          cursorColor="black"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          placeholder="Enter Capacity"
          keyboardType="numeric"
          style={[styles.inputStyle, {backgroundColor: 'white'}]}
          onChangeText={text => updateField('capacity', text)}
        />
      </View>
      <View className="gap-3">
        <Text className="text-xl font-bold">Category</Text>
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
          onChangeValue={text => updateField('hourlyPrice', text)}
        />
      </View>

      <View className="gap-3">
        <Text className="text-xl font-bold">Hourly Price</Text>
        <TextInput
          mode="flat"
          cursorColor="black"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          placeholder="Enter Hourly Price"
          keyboardType="numeric"
          style={[styles.inputStyle, {backgroundColor: 'white'}]}
          onChangeText={text => updateField('category', text)}
        />
      </View>

      <View className="flex gap-4">
        <Text className="text-xl font-bold">Turf Type</Text>
        <CustomMultiselect
          options={turfOptions}
          selected={selectedTurfTypes}
          onChange={(selected: any) => {
            setSelectedTurfTypes(selected);
            const gameInfoUpdate = {
              indoor: selected.includes('indoor') ? 'true' : 'false',
              outdoor: selected.includes('outdoor') ? 'true' : 'false',
              roof: selected.includes('roof') ? 'true' : 'false',
            };
            updateField('gameInfo', gameInfoUpdate);
          }}
        />
      </View>

      <View className="gap-3">
        <Text className="text-xl font-bold">Surface</Text>

        <TextInput
          mode="flat"
          cursorColor="black"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          placeholder="Enter Surface"
          keyboardType="default"
          style={[styles.inputStyle, {backgroundColor: 'white'}]}
          onChangeText={text => updateField('gameInfo', {surface: text})}
        />
      </View>

      <View className="gap-3">
        <Text className="text-xl font-bold">Net</Text>
        <TextInput
          mode="flat"
          cursorColor="black"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          placeholder="Enter Turf Net"
          keyboardType="numeric"
          style={[styles.inputStyle, {backgroundColor: 'white'}]}
          onChangeText={text => updateField('net', {net: text})}
        />
      </View>
    </View>
  );
};

export default VenueDeatils;

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 2,
    borderColor: 'gray',
    borderStyle: 'dotted',
    borderRadius: 8,
  },
  textAreaInputStyle: {
    borderWidth: 2,
    borderColor: 'gray',
    borderStyle: 'dotted',
    borderRadius: 8,
    minHeight: 80,
  },
  pickerWrapper: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 8,
    borderStyle: 'dotted',
    backgroundColor: 'white',
  },
  dropdown: {
    borderWidth: 1.5,
    borderColor: 'gray',
    borderRadius: 8,
    backgroundColor: 'white',
    borderStyle: 'dotted',
  },
  dropdownContainer: {
    borderWidth: 1.5,
    borderColor: 'gray',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    borderStyle: 'dotted',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownPlaceholder: {
    color: '#999',
  },
});
