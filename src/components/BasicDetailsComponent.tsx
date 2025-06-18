import React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useVenueStore} from '../store/useVenueStore';
import {useTheme} from '../context/ThemeContext';

const BasicDetailsComponent = () => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const {formData, updateField} = useVenueStore();
  console.log('updateField>>>', formData);
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.head}>Location Details</Text>
      <View style={styles.card}>
        <Text style={styles.label}>City*</Text>
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
        <Text style={styles.label}>Area*</Text>
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
            placeholder="Enter Your Turf Detailed Address"
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

const getStyles = (theme: any) =>
  StyleSheet.create({
    content: {
      paddingVertical: 10,
    },
    head: {
      fontSize: 16,
      fontFamily: 'Montserrat-SemiBold',
      paddingVertical: 15,
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
      paddingLeft: 15,
      color: theme.colors.text,
    },
    card: {
      padding: 16,
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      fontFamily: 'Montserrat-SemiBold',
      color: theme.colors.labeltext,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      backgroundColor: theme.colors.card,
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
      color: theme.colors.text,
      paddingVertical: 20,
      fontFamily: 'Montserrat-Medium',
    },
    textareaInput: {
      flex: 1,
      color: theme.colors.text,
      fontSize: 14,
    },
  });
