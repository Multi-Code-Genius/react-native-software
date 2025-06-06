import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

const fontsToTest = [
  {name: 'System', label: 'System Default'},
  {name: 'Montserrat-Regular', label: 'Montserrat-Regular (Custom)'},
  {name: 'ClashGrotesk', label: 'ClashGrotesk (Custom)'},
  {
    name: 'Montserrat-Regular',
    label: 'Montserrat-Regular (fallback test)',
  },
  {name: 'ClashGrotesk-Bold', label: 'ClashGrotesk-Bold (fallback test)'},
];

const A = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {fontsToTest.map((font, index) => (
        <View key={index} style={styles.item}>
          <Text style={[styles.label, {fontFamily: font.name}]}>
            {font.label}
          </Text>
          <Text style={[styles.sample, {fontFamily: font.name}]}>
            The quick brown fox jumps over the lazy dog.
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  item: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 4,
    color: '#555',
  },
  sample: {
    fontSize: 20,
    color: '#111',
  },
});

export default A;
