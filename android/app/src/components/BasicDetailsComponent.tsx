import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { addVenueStore } from '../store/addVenueStore';

const BasicDetailsComponent = () => {
  const updateField = addVenueStore(state => state.updateField);
  const formData = addVenueStore(state => state.formData);

  useEffect(() => {
    updateField('city', 'surat');
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
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
        <View style={[styles.inputWrapper, { height: 100, alignItems: 'flex-start', justifyContent: 'flex-start', paddingTop: 5 }]}>
          <Icon name="note-text" size={20} color="#666" style={styles.newicon} />
          <TextInput
            style={[styles.input]}
            placeholder="Enter venue description"
            multiline
            numberOfLines={4}
            onChangeText={text => updateField('description', text)}
            value={formData.description || ''}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>City</Text>
        <View style={styles.inputWrapper}>
          <Icon name="city" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            value="Surat"
            editable={false}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Area</Text>
        <View style={styles.inputWrapper}>
          <Icon name="map-marker-radius" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Area"
            onChangeText={text => updateField('area', text)}
            value={formData.location?.area || ''}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Address</Text>
        <View style={styles.inputWrapper}>
          <Icon name="home-map-marker" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Address"
            onChangeText={text => updateField('address', text)}
            value={formData.address || ''}
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
    flex: 1
  },
  content: {
    padding: 10
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 0
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#444'
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fafafa'
  },
  icon: {
    marginRight: 8
  },
  newicon: {
    paddingTop: 8,
    marginRight: 8
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#000'
  }
});
