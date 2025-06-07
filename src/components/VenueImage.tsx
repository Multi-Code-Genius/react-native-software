import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../styles/VenueDetailsStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const VenueImage = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.head}>Image</Text>

      <View style={styles.card}>
        <Text style={styles.label}>venue Image</Text>
        <View
          style={{
            width: '100%',
            backgroundColor: '#323232',
            padding: 80,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: '#202020',
          }}>
          <TouchableOpacity style={styles.backButton}>
            <Icon name="plus" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default VenueImage;
