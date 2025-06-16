// components/CustomCheckbox.tsx
import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../context/ThemeContext';

type Props = {
  checked: boolean;
  onToggle: () => void;
  label?: string;
};

const CustomCheckbox: React.FC<Props> = ({checked, onToggle, label}) => {
  const {theme} = useTheme();
  const styles = getstyles(theme);
  return (
    <TouchableOpacity onPress={onToggle} style={styles.container}>
      <View style={[styles.checkbox, checked && styles.checkedBox]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const getstyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      width: 24,
      height: 24,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.card,
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
      color: theme.colors.labeltext,
    },
  });

export default CustomCheckbox;
