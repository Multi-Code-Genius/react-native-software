import React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useVenueStore} from '../store/useVenueStore';

const BasicDetailsComponent = () => {
  const {formData, updateField} = useVenueStore();
  console.log('updateField>>>', formData);
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.head}>Location Details</Text>
      <View style={styles.card}>
        <Text style={styles.label}>City</Text>
        <View style={styles.inputWrapper}>
          <Icon name="city" size={25} color="#717171" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter City"
            placeholderTextColor="#717171"
            onChangeText={text => updateField('city', text)}
            value={formData?.location?.city || ''}
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Area</Text>
        <View style={styles.inputWrapper}>
          <Icon
            name="map-marker-radius"
            size={25}
            color="#717171"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Area"
            placeholderTextColor="#717171"
            onChangeText={text => updateField('area', text)}
            value={formData?.location?.area || ''}
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Adress</Text>
        <View
          style={[
            styles.inputWrapper,
            {
              height: 120,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              paddingTop: 5,
            },
          ]}>
          <Icon
            name="office-building-marker"
            size={20}
            color="#666"
            style={styles.newIcon}
          />
          <TextInput
            style={[styles.textareaInput]}
            placeholder="Enter Your Address"
            placeholderTextColor="#717171"
            multiline
            numberOfLines={16}
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
  content: {
    paddingVertical: 10,
  },
  head: {
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 15,
    borderBottomColor: '#252525',
    borderBottomWidth: 1,
    paddingLeft: 15,
    color: '#fff',
  },
  card: {
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#e2dede',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#272727',
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
    fontSize: 14,
    color: 'white',
    paddingVertical: 20,
  },
  textareaInput: {
    flex: 1,
    color: 'white',
    fontSize: 14,
  },
});
