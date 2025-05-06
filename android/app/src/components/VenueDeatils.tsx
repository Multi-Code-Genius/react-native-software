import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomMultiselect from "./CustomMultiselect";
import { Divider, TextInput } from "react-native-paper";
import RNPickerSelect from 'react-native-picker-select';

const VenueDeatils = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedTurfTypes, setSelectedTurfTypes] = useState<string[]>([]);

    const turfOptions = [
        { label: "Indoor", value: "indoor" },
        { label: "Outdoor", value: "outdoor" },
        { label: "Roof", value: "roof" },
    ];

    const categories = ["Football", "Cricket", "Basketball"];

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
                    style={[styles.inputStyle, { backgroundColor: 'white' }]}
                />
            </View>
            <View className="gap-3">
                <Text className="text-xl font-bold">Category</Text>
                <RNPickerSelect
                    onValueChange={(value) => setSelectedCategory(value)}
                    value={selectedCategory}
                    placeholder={{ label: "Select Category", value: null }}
                    items={categories.map((cat) => ({ label: cat, value: cat }))}
                    style={{
                        inputIOS: {
                            paddingVertical: 12,
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: 'gray',
                            borderRadius: 8,
                            backgroundColor: 'white',
                            color: 'black',
                        },
                        inputAndroid: {
                            paddingVertical: 8,
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: 'gray',
                            borderRadius: 8,
                            backgroundColor: 'white',
                            color: 'black',
                        },
                    }}
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
                    style={[styles.inputStyle, { backgroundColor: 'white' }]}
                />
            </View>
            <View className="flex gap-4">
                <Text className="text-xl font-bold">Turf Type</Text>
                <CustomMultiselect
                    options={turfOptions}
                    selected={selectedTurfTypes}
                    onChange={setSelectedTurfTypes}
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
                    keyboardType="numeric"
                    style={[styles.inputStyle, { backgroundColor: 'white' }]}
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
                    style={[styles.inputStyle, { backgroundColor: 'white' }]}
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
});
