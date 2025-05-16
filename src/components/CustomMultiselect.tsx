import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';

const CustomMultiselect = ({options, selected, onChange}: any) => {
  const toggleSelect = (value: any) => {
    if (selected.includes(value)) {
      onChange([]);
    } else {
      onChange([value]);
    }
  };

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      {options.map((opt: any) => {
        const isSelected = selected.includes(opt.value);
        return (
          <TouchableOpacity
            key={opt.value}
            onPress={() => toggleSelect(opt.value)}
            style={[
              styles.optionButton,
              {
                borderColor: isSelected ? '#4a90e2' : '#000',
                backgroundColor: isSelected ? '#4a90e2' : 'transparent',
              },
            ]}>
            <Text style={{color: isSelected ? '#fff' : '#000'}}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomMultiselect;

const styles = StyleSheet.create({
  optionButton: {
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
    marginBottom: 10,
  },
});
