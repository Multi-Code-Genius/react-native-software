import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  GestureResponderEvent,
} from "react-native";

const states: string[] = ["Maharashtra", "Karnataka", "Delhi"];
const cities: string[] = ["Mumbai", "Pune", "Nagpur"];

const BasicDetailsComponent: React.FC = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  const renderDropdown = (
    data: string[],
    onSelect: (item: string) => void,
    onClose: (event?: GestureResponderEvent) => void
  ) => (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity
        className="flex-1 bg-black/30 justify-center p-5"
        activeOpacity={1}
        onPress={onClose}
      >
        <View className="bg-white rounded-lg max-h-[300px] p-2">
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="p-3 border-b border-gray-300"
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
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
          className="border border-gray-400 border-dotted rounded-md p-3"
          placeholder="Enter name"
        />
      </View>

      <View className="flex gap-3">
        <Text className="text-lg font-bold">Venue</Text>
        <TextInput
          className="border border-gray-400 border-dotted rounded-md p-3 min-h-[80px] text-top"
          placeholder="Enter venue"
          multiline
          numberOfLines={4}
        />
      </View>

      <View className="flex-row gap-3 items-start">
        <View className="flex-1 gap-3">
          <TouchableOpacity
            className="border border-black border-dotted rounded-md p-3 flex-row justify-between items-center"
            onPress={() => setIsStateDropdownOpen(true)}
          >
            <Text className="text-black">{selectedState || "Select State"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="border border-black border-dotted rounded-md p-3 flex-row justify-between items-center"
            onPress={() => setIsCityDropdownOpen(true)}
          >
            <Text className="text-black">{selectedCity || "Select City"}</Text>
          </TouchableOpacity>
        </View>

        <View className="w-[100px] bg-green-100 p-3 rounded-md items-center">
          <Text className="text-green-600 font-medium mt-1">Google Map</Text>
        </View>
      </View>

      {/* Address Input */}
      <View className="space-y-2">
        <Text className="text-lg font-bold">Address</Text>
        <TextInput
          className="border border-gray-400 border-dotted rounded-md p-3"
          placeholder="Enter address"
        />
      </View>

      {/* Postal Code Input */}
      <View className="space-y-2">
        <Text className="text-lg font-bold">Postal Code</Text>
        <TextInput
          className="border border-gray-400 border-dotted rounded-md p-3"
          placeholder="Enter postal code"
        />
      </View>

      {/* Modals */}
      {isStateDropdownOpen &&
        renderDropdown(states, setSelectedState, () => setIsStateDropdownOpen(false))}
      {isCityDropdownOpen &&
        renderDropdown(cities, setSelectedCity, () => setIsCityDropdownOpen(false))}
    </View>
  );
};

export default BasicDetailsComponent;
