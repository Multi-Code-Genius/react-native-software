// components/CustomCheckbox.tsx
import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

type Props = {
  checked: boolean;
  onToggle: () => void;
  label?: string;
};

const CustomCheckbox: React.FC<Props> = ({checked, onToggle, label}) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.container}>
      <View style={[styles.checkbox, checked && styles.checkedBox]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#555',
    backgroundColor: '#272727',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkedBox: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: '#B8B8B8',
  },
});

export default CustomCheckbox;
