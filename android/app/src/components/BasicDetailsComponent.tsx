import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { addVenueStore } from '../store/addVenueStore';

const states: string[] = ['Maharashtra', 'Karnataka', 'Delhi'];
const cities: string[] = ['Mumbai', 'Pune', 'Nagpur'];

const BasicDetailsComponent: React.FC = () => {
  const updateField = addVenueStore(state => state.updateField);

  const formData = addVenueStore(state => state.formData);
  useEffect(() => {
    updateField('city', 'surat');
  }, []);

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
            renderItem={({ item }) => (
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
          style={[styles.inputStyle, { backgroundColor: 'white' }]}
          placeholder="Enter name"
          onChangeText={text => updateField('name', text)}
          value={formData.name || ''}
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
          multiline={true}
          numberOfLines={4}
          style={[
            styles.textAreaInputStyle,
            { backgroundColor: 'white', textAlignVertical: 'top' },
          ]}
          onChangeText={text => updateField('description', text)}
          value={formData.description || ''}
        />
      </View>

      <View className="flex gap-3">
        <Text className="text-lg font-bold">City</Text>

        <TextInput
          mode="flat"
          cursorColor="black"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          style={[styles.inputStyle, { backgroundColor: 'white' }]}
          value={'surat'}
          // onChangeText={text => updateField('city', 'surat')}
          disabled
        />
      </View>

      <View className="flex gap-3">
        <Text className="text-lg font-bold">Area</Text>

        <TextInput
          placeholder="Enter Area"
          mode="flat"
          cursorColor="black"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          style={[styles.inputStyle, { backgroundColor: 'white' }]}
          onChangeText={text => updateField('area', text)}
          value={formData.location?.area || ''}
        />
      </View>

      <View className=" gap-4">
        <Text className="text-lg font-bold">Address</Text>

        <TextInput
          placeholder="Enter address"
          mode="flat"
          cursorColor="black"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          style={[styles.inputStyle, { backgroundColor: 'white' }]}
          onChangeText={text => updateField('address', text)}
          value={formData.address || ''}
        />
      </View>
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
    maxHeight: 80,
    minHeight: 80,
  },
});
