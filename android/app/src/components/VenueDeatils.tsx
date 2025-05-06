import React, { useState } from "react";
import { View, Pressable, FlatList, Text, TextInput, Modal } from "react-native";
import CustomMultiselect from "./CustomMultiselect";
import { Divider } from "react-native-paper";

const VenueDeatils = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [selectedTurfTypes, setSelectedTurfTypes] = useState<string[]>([]);

    const turfOptions = [
        { label: "Indoor", value: "indoor" },
        { label: "Outdoor", value: "outdoor" },
        { label: "Roof", value: "roof" },
    ];

    const categories = ["Football", "Cricket", "Basketball"];

    return (
        <View className="w-full p-2 flex gap-4">
            <View className="gap-3 mb-3">
                <Text className="text-xl font-bold">Capacity</Text>
                <TextInput
                    mode="outlined"
                    placeholder="Enter Capacity"
                    keyboardType="numeric"
                    className="border border-dotted rounded-md"
                />
            </View>
            <View className="gap-3 mb-6">
                <Text className="text-xl font-bold">Category</Text>
                <Pressable
                    onPress={() => setShowCategoryModal(true)}
                    className="flex-row justify-between items-center border border-dotted border-black rounded-md px-4 py-3"
                >
                    <Text>{selectedCategory || "Select Category"}</Text>
                    {/* <AntDesign name="caretdown" size={15} color="black" /> */}
                </Pressable>

                <Modal
                    visible={showCategoryModal}
                    onDismiss={() => setShowCategoryModal(false)}>
                    <FlatList
                        data={categories}
                        keyExtractor={(item) => item}
                        ItemSeparatorComponent={() => <Divider />}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => {
                                    setSelectedCategory(item);
                                    setShowCategoryModal(false);
                                }}
                                className="p-3"
                            >
                                <Text>{item}</Text>
                            </Pressable>
                        )}
                    />
                </Modal>
            </View>
            <View className="gap-3">
                <Text className="text-xl font-bold">Hourly Price</Text>
                <TextInput
                    mode="outlined"
                    placeholder="Enter Price"
                    keyboardType="numeric"
                    className="border border-dotted border-black rounded-md"
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
                    mode="outlined"
                    placeholder="Enter Surface"
                    className="border border-dotted border-black rounded-md"
                />
            </View>
            <View className="gap-3">
                <Text className="text-xl font-bold">Net</Text>
                <TextInput
                    mode="outlined"
                    placeholder="Enter Turf Name"
                    className="border border-dotted border-black rounded-md"
                />
            </View>
        </View>

    );
};

export default VenueDeatils;
