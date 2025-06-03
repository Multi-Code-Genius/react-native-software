import React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useVenueStore} from '../store/useVenueStore';

const BasicDetailsComponent = () => {
  const updateField = useVenueStore(state => state.updateField);
  const formData = useVenueStore(state => state.formData);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <View style={styles.inputWrapper}>
          <Icon name="account" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            onChangeText={text => updateField('name', text)}
            value={formData.name || ''}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Description</Text>
        <View
          style={[
            styles.inputWrapper,
            {
              height: 100,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              paddingTop: 5,
            },
          ]}>
          <Icon
            name="note-text"
            size={20}
            color="#666"
            style={styles.newIcon}
          />
          <TextInput
            style={[styles.textareaInput]}
            placeholder="Enter venue description"
            multiline
            numberOfLines={14}
            onChangeText={text => updateField('description', text)}
            value={formData.description || ''}
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.inputWrapper}>
          <Icon
            name="apache-kafka"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Category"
            onChangeText={text => updateField('category', text)}
            value={formData.category || ''}
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Address</Text>
        <View style={styles.inputWrapper}>
          <Icon
            name="home-map-marker"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Address"
            onChangeText={text => updateField('address', text)}
            value={formData.address || ''}
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>hourlyPrice</Text>
        <View style={styles.inputWrapper}>
          <Icon
            name="currency-rupee"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter hourly price"
            keyboardType="numeric"
            onChangeText={text => updateField('hourlyPrice', parseFloat(text))}
            value={formData.hourlyPrice ? formData.hourlyPrice.toString() : ''}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default BasicDetailsComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f8fc',
  },
  content: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 0,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#444',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fafafa',
  },
  icon: {
    marginRight: 8,
  },
  newIcon: {
    paddingTop: 8,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#000',
  },
  textareaInput: {
    flex: 1,
    color: 'black',
    fontSize: 14,
  },
});
