import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useVenueStore} from '../store/useVenueStore';
import {styles} from '../styles/VenueDetailsStyles';

const VenueDetails = () => {
  const updateField = useVenueStore(state => state.updateField);
  const formData = useVenueStore(state => state.formData);

  const sportTypes = ['Cricket', 'Football'];
  const venueTypes = ['Outdoor', 'Indoor', 'Roof'];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.head}>Venue Details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Venue Name</Text>
        <View style={styles.inputWrapper}>
          <Icon name="google-maps" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Venue Name"
            placeholderTextColor="#717171"
            onChangeText={text => updateField('name', text)}
            value={formData.name || ''}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Sport Type</Text>
        <View style={{flexDirection: 'row', gap: 10}}>
          {sportTypes.map(type => (
            <TouchableOpacity
              key={type}
              onPress={() => updateField('sportType', type)}
              style={[
                styles.inputWrapper2,
                {
                  borderColor: formData.sportType === type ? '#B2C000' : '#999',
                  backgroundColor:
                    formData.sportType === type ? '#1D1D1D' : '#333',
                },
              ]}>
              <Icon
                name={type === 'Cricket' ? 'cricket' : 'football'}
                size={20}
                color="#fff"
                style={styles.icon}
              />
              <Text
                style={[
                  styles.input2,
                  {color: formData.sportType === type ? '#B2C000' : '#fff'},
                ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Venue Type</Text>
        <View style={{flexDirection: 'row', gap: 10}}>
          {venueTypes.map(type => (
            <TouchableOpacity
              key={type}
              onPress={() => updateField('venueType', type)}
              style={[
                styles.inputWrapper3,
                {
                  borderColor: formData.venueType === type ? '#B2C000' : '#999',
                  backgroundColor:
                    formData.venueType === type ? '#1D1D1D' : '#333',
                },
              ]}>
              <Text
                style={[
                  styles.input3,
                  {color: formData.venueType === type ? '#B2C000' : '#fff'},
                ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <View style={{flexDirection: 'row', width: '100%', gap: 10}}>
          <View style={{width: '50%', flexDirection: 'column', gap: 10}}>
            <Text style={styles.label}>Opening Time</Text>
            <View style={styles.inputWrapper4}>
              <Icon
                name="clock-time-ten"
                size={20}
                color="#888888"
                style={styles.icon}
              />
              <Text style={styles.input2}>06.00 am</Text>
            </View>
          </View>
          <View style={{width: '50%', flexDirection: 'column', gap: 10}}>
            <Text style={styles.label}>Closing Time</Text>
            <View style={styles.inputWrapper4}>
              <Icon
                name="clock-time-three"
                size={20}
                color="#888888"
                style={styles.icon}
              />
              <Text style={styles.input2}>01.00 pm</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default VenueDetails;
