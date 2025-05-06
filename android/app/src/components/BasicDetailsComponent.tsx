import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {addVenueStore} from '../store/addVenueStore';

const states: string[] = ['Maharashtra', 'Karnataka', 'Delhi'];
const cities: string[] = ['Mumbai', 'Pune', 'Nagpur'];

const BasicDetailsComponent: React.FC = () => {
  const updateField = addVenueStore(state => state.updateField);

  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  const renderDropdown = (
    data: string[],
    onSelect: (item: string) => void,
    onClose: (event?: GestureResponderEvent) => void,
  ) => (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity
        className="flex-1 bg-black/30 justify-center p-5"
        activeOpacity={1}
        onPress={onClose}>
        <View className="bg-white rounded-lg max-h-[300px] p-2">
          <FlatList
            data={data}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <TouchableOpacity
                className="p-3 border-b border-gray-300"
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}>
                <Text className="text-base">{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View className="p-2 flex gap-3">
      <View className="flex gap-4">
        <Text className="text-lg font-bold">Name</Text>

        <TextInput
          mode="flat"
          cursorColor="black"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          style={[styles.inputStyle, {backgroundColor: 'white'}]}
          placeholder="Enter name"
          onChangeText={text => updateField('name', text)}
        />
      </View>

      <View className="flex gap-3">
        <Text className="text-lg font-bold">Description</Text>
        <TextInput
          placeholder="Enter venue"
          mode="flat"
          cursorColor="black"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          style={[styles.textAreaInputStyle, {backgroundColor: 'white'}]}
          onChangeText={text => updateField('description', text)}
        />
      </View>

      <View className="flex-row gap-3 items-start ">
        <View className="flex-1 gap-3">
          <TouchableOpacity
            className="border border-black border-dotted rounded-md p-3 flex-row justify-between items-center"
            onPress={() => setIsStateDropdownOpen(true)}>
            <Text className="text-black">
              {selectedState || 'Select State'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="border border-black border-dotted rounded-md p-3 flex-row justify-between items-center"
            onPress={() => setIsCityDropdownOpen(true)}>
            <Text className="text-black">{selectedCity || 'Select City'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className=" gap-4">
        <Text className="text-lg font-bold">Address</Text>

        <TextInput
          placeholder="Enter address"
          mode="flat"
          cursorColor="black"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          style={[styles.inputStyle, {backgroundColor: 'white'}]}
        />
      </View>

      <View className=" gap-4">
        <Text className="text-lg font-bold">Postal Code</Text>

        <TextInput
          placeholder="Enter postal code"
          mode="flat"
          cursorColor="black"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          style={[styles.inputStyle, {backgroundColor: 'white'}]}
        />
      </View>

      {isStateDropdownOpen &&
        renderDropdown(states, setSelectedState, () =>
          setIsStateDropdownOpen(false),
        )}
      {isCityDropdownOpen &&
        renderDropdown(cities, setSelectedCity, () =>
          setIsCityDropdownOpen(false),
        )}
    </View>
  );
};

export default BasicDetailsComponent;

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
});
