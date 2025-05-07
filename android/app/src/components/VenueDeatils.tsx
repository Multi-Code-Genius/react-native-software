import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomMultiselect from './CustomMultiselect';
import { TextInput } from 'react-native-paper';
import { addVenueStore } from '../store/addVenueStore';
import DropDownPicker from 'react-native-dropdown-picker';

const VenueDeatils = () => {
    const updateField = addVenueStore(state => state.updateField);
    const formData = addVenueStore(state => state.formData);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(formData?.category || '');
    const [items, setItems] = useState([
        { label: 'Football', value: 'Football' },
        { label: 'Cricket', value: 'Cricket' },
        { label: 'Basketball', value: 'Basketball' },
    ]);

    const [selectedTurfTypes, setSelectedTurfTypes] = useState<string[]>([]);

    const turfOptions = [
        { label: 'Indoor', value: 'indoor' },
        { label: 'Outdoor', value: 'outdoor' },
        { label: 'Roof', value: 'roof' },
    ];

    return (
        <View className="w-full p-2 flex gap-3">
            <View className="gap-3">
                <Text className="text-lg font-bold">Capacity</Text>
                <TextInput
                    mode="flat"
                    cursorColor="black"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    placeholder="Enter Capacity"
                    keyboardType="numeric"
                    style={[styles.inputStyle, { backgroundColor: 'white' }]}
                    onChangeText={text => updateField('capacity', text)}
                    value={formData.capacity || ''}
                />
            </View>

            <View className="gap-3">
                <Text className="text-lg font-bold">Category</Text>
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
                />
            </View>

            <View className="gap-3">
                <Text className="text-lg font-bold">Hourly Price</Text>
                <TextInput
                    mode="flat"
                    cursorColor="black"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    placeholder="Enter Hourly Price"
                    keyboardType="numeric"
                    style={[styles.inputStyle, { backgroundColor: 'white' }]}
                    onChangeText={text => updateField('hourlyPrice', text)}
                    value={formData.hourlyPrice || ''}
                />
            </View>

            <View className="flex gap-3">
                <Text className="text-lg font-bold">Turf Type</Text>
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
                        updateField('gameInfo', { ...formData.gameInfo, ...gameInfoUpdate });
                    }}
                />
            </View>

            <View className="gap-3">
                <Text className="text-lg font-bold">Surface</Text>
                <TextInput
                    mode="flat"
                    cursorColor="black"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    placeholder="Enter Surface"
                    keyboardType="default"
                    style={[styles.inputStyle, { backgroundColor: 'white' }]}
                    onChangeText={text =>
                        updateField('gameInfo', { ...formData.gameInfo, surface: text })
                    }
                    value={formData.gameInfo?.surface || ''}
                />
            </View>

            <View className="gap-3">
                <Text className="text-lg font-bold">Net</Text>
                <TextInput
                    mode="flat"
                    cursorColor="black"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    placeholder="Enter Turf Net"
                    keyboardType="numeric"
                    style={[styles.inputStyle, { backgroundColor: 'white' }]}
                    onChangeText={text => updateField('net', text)}
                    value={formData.net || ''}
                />
            </View>
        </View>
    );
};

export default VenueDeatils;

const styles = StyleSheet.create({
    inputStyle: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
    },
    textAreaInputStyle: {
        borderWidth: 1,
        borderColor: 'gray',
        borderStyle: 'solid',
        borderRadius: 4,
        minHeight: 80,
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        borderStyle: 'solid',
        backgroundColor: 'white',
    },
    dropdown: {
        height: 60,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        borderStyle: 'solid',
    },
    dropdownContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
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
