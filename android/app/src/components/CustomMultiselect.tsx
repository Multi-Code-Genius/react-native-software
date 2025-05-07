import { TouchableOpacity, Text as RNText, View } from "react-native";

const CustomMultiselect = ({ options, selected, onChange }: any) => {
    const toggleSelect = (value: any) => {
        if (selected.includes(value)) {
            onChange([]);
        } else {
            onChange([value]);
        }
    };

    return (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {options.map((opt: any) => {
                const isSelected = selected.includes(opt.value);
                return (
                    <TouchableOpacity
                        key={opt.value}
                        onPress={() => toggleSelect(opt.value)}
                        style={{
                            borderRadius: 8,
                            borderStyle: 'solid',
                            borderWidth: 1,
                            borderColor: isSelected ? "#4a90e2" : "#000",
                            backgroundColor: isSelected ? "#4a90e2" : "transparent",
                            paddingVertical: 8,
                            paddingHorizontal: 12,
                            marginRight: 10,
                            marginBottom: 10,
                        }}
                    >
                        <RNText style={{ color: isSelected ? "#fff" : "#000" }}>
                            {opt.label}
                        </RNText>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default CustomMultiselect;
