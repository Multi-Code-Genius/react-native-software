import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useVenueStore} from '../store/useVenueStore';
import {getStyles} from '../styles/VenueDetailsStyles';
import DatePicker from 'react-native-date-picker';
import {useTheme} from '../context/ThemeContext';

const VenueDetails = () => {
  const updateField = useVenueStore(state => state.updateField);
  const formData = useVenueStore(state => state.formData);
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const sportTypes = ['Cricket', 'Football'];
  const venueTypes = ['Outdoor', 'Indoor', 'Roof'];
  const opening = formData.gameInfo?.openingTime;
  const closing = formData.gameInfo?.closingTime;

  const formatLocalTime = (isoString: string) => {
    const date = new Date(isoString);
    let hours = date.getUTCHours();
    const mins = String(date.getUTCMinutes()).padStart(2, '0');
    const suffix = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${mins} ${suffix}`;
  };

  const getLocalDateFromUTC = (isoString: string) => {
    const date = new Date(isoString);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  };

  const getUTCISOStringFromLocal = (date: Date) => {
    return new Date(
      date.getTime() - date.getTimezoneOffset() * 60000,
    ).toISOString();
  };

  const [openingTime, setOpeningTime] = useState<Date>(
    opening ? getLocalDateFromUTC(opening) : new Date(),
  );
  const [closingTime, setClosingTime] = useState<Date>(
    closing ? getLocalDateFromUTC(closing) : new Date(),
  );

  useEffect(() => {
    if (opening) {
      setOpeningTime(new Date(opening));
    }
    if (closing) {
      setClosingTime(new Date(closing));
    }
  }, [opening, closing]);

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
                    formData.gameInfo?.type === type
                      ? theme.colors.text
                      : theme.colors.border,
                  backgroundColor: theme.colors.card,
                },
              ]}>
              <Icon
                name={type === 'Cricket' ? 'cricket' : 'football'}
                size={20}
                color={
                  formData.gameInfo?.type === type ? theme.colors.text : '#888'
                }
                style={styles.icon}
              />
              <Text
                style={[
                  styles.input2,
                  {
                    color:
                      formData.gameInfo?.type === type
                        ? theme.colors.text
                        : '#888',
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
                  borderColor:
                    formData.category === type
                      ? theme.colors.text
                      : theme.colors.border,
                  backgroundColor: theme.colors.card,
                },
              ]}>
              <Text
                style={[
                  styles.input3,
                  {
                    color:
                      formData.category === type ? theme.colors.text : '#888',
                  },
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
                color={theme.colors.timetext}
                style={styles.icon}
              />
              <Text style={styles.input2}>
                {opening ? formatLocalTime(opening) : formatTime(openingTime)}
              </Text>
            </TouchableOpacity>
            <DatePicker
              modal
              mode="time"
              open={showOpeningPicker}
              date={openingTime}
              onConfirm={date => {
                setShowOpeningPicker(false);
                setOpeningTime(date);
                updateField('gameInfo', {
                  ...formData.gameInfo,
                  openingTime: getUTCISOStringFromLocal(date),
                });
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
                color={theme.colors.timetext}
                style={styles.icon}
              />
              <Text style={styles.input2}>
                {closing ? formatLocalTime(closing) : formatTime(closingTime)}
              </Text>
            </TouchableOpacity>
            <DatePicker
              modal
              mode="time"
              open={showClosingPicker}
              date={closingTime}
              onConfirm={date => {
                setShowClosingPicker(false);
                setClosingTime(date);
                updateField('gameInfo', {
                  ...formData.gameInfo,
                  closingTime: getUTCISOStringFromLocal(date),
                });
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
