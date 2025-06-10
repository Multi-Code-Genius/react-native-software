import React, {useState} from 'react';
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
import DatePicker from 'react-native-date-picker';

const VenueDetails = () => {
  const updateField = useVenueStore(state => state.updateField);
  const formData = useVenueStore(state => state.formData);
  console.log('formdata>>', formData);
  const sportTypes = ['Cricket', 'Football'];
  const venueTypes = ['Outdoor', 'Indoor', 'Roof'];

  const [openingTime, setOpeningTime] = useState(
    formData?.gameInfo?.openingTime
      ? new Date(formData.gameInfo.openingTime)
      : new Date(),
  );
  const [closingTime, setClosingTime] = useState(
    formData?.gameInfo?.closingTime
      ? new Date(formData.gameInfo.closingTime)
      : new Date(),
  );

  const [showOpeningPicker, setShowOpeningPicker] = useState(false);
  const [showClosingPicker, setShowClosingPicker] = useState(false);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
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
              onPress={() => updateField('type', type)}
              style={[
                styles.inputWrapper2,
                {
                  borderColor:
                    formData.gameInfo?.type === type ? '#B2C000' : '#999',
                  backgroundColor:
                    formData.gameInfo?.type === type ? '#1D1D1D' : '#333',
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
                  {
                    color:
                      formData.gameInfo?.type === type ? '#B2C000' : '#fff',
                  },
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
              onPress={() => updateField('category', type)}
              style={[
                styles.inputWrapper3,
                {
                  borderColor: formData.category === type ? '#B2C000' : '#999',
                  backgroundColor:
                    formData.category === type ? '#1D1D1D' : '#333',
                },
              ]}>
              <Text
                style={[
                  styles.input3,
                  {color: formData.category === type ? '#B2C000' : '#fff'},
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
            <TouchableOpacity
              style={styles.inputWrapper4}
              onPress={() => setShowOpeningPicker(true)}>
              <Icon
                name="clock-time-ten"
                size={20}
                color="#888888"
                style={styles.icon}
              />
              <Text style={styles.input2}>{formatTime(openingTime)}</Text>
            </TouchableOpacity>
            <DatePicker
              modal
              mode="time"
              open={showOpeningPicker}
              date={openingTime}
              onConfirm={date => {
                setShowOpeningPicker(false);
                setOpeningTime(date);
                updateField('openingTime', date.toISOString());
              }}
              onCancel={() => setShowOpeningPicker(false)}
            />
          </View>

          <View style={{width: '50%', flexDirection: 'column', gap: 10}}>
            <Text style={styles.label}>Closing Time</Text>
            <TouchableOpacity
              style={styles.inputWrapper4}
              onPress={() => setShowClosingPicker(true)}>
              <Icon
                name="clock-time-three"
                size={20}
                color="#888888"
                style={styles.icon}
              />
              <Text style={styles.input2}>{formatTime(closingTime)}</Text>
            </TouchableOpacity>
            <DatePicker
              modal
              mode="time"
              open={showClosingPicker}
              date={closingTime}
              onConfirm={date => {
                setShowClosingPicker(false);
                setClosingTime(date);
                updateField('closingTime', date.toISOString());
              }}
              onCancel={() => setShowClosingPicker(false)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default VenueDetails;
