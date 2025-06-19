import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getStyles} from '../../styles/bookingDetailStyles';
import {useTheme} from '../../context/ThemeContext';
import {useCancelBooking} from '../../api/booking';
interface BookingCardProps {
  startTime: string;
  endTime: string;
  bgColor?: string;
  name: string;
  phone: string;
  duration: string;
  price: string;
  sport: string;
  isAvailable?: boolean;
  bookingId: string;
}

const BookingCard: React.FC<BookingCardProps> = ({
  startTime,
  bookingId,
  endTime,
  bgColor = '#784847',
  name,
  phone,
  duration,
  price,
  sport,
  isAvailable,
}) => {
  const {mutate: cancelBooking, isPending} = useCancelBooking();
  const {theme} = useTheme();
  const isDark = theme.dark;
  const styles = getStyles(theme);
  const handleDelete = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [{text: 'No'}, {text: 'Yes', onPress: () => cancelBooking(bookingId)}],
    );
  };
  return (
    <View style={styles.booking}>
      <View style={[styles.left, {backgroundColor: bgColor}]}>
        <Text style={styles.time}>{startTime}</Text>
        <View style={styles.divider} />
        <Text style={styles.time}>{endTime}</Text>
      </View>

      {isAvailable ? (
        <View style={styles.available}>
          <Text style={styles.username}>Available</Text>
          <Icon
            name="add-circle-outline"
            size={20}
            color={isDark ? '#FFF' : '#000'}
          />
        </View>
      ) : (
        <View style={styles.right}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.username}>{name}</Text>
            {sport.toLowerCase() === 'cricket' ? (
              <Text style={styles.type}>Cricket</Text>
            ) : sport.toLowerCase() === 'football' ? (
              <Text style={styles.type1}>Football</Text>
            ) : (
              <Text style={styles.type}>{sport}</Text>
            )}
          </View>

          <View style={{flexDirection: 'row', gap: 10}}>
            <Icon name="call-outline" size={20} color={'#888888'} />
            <Text style={styles.number}>{phone}</Text>
          </View>

          <View style={{flexDirection: 'row', gap: 20}}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Icon name="time-outline" size={20} color={'#888888'} />
              <Text style={styles.number}>{duration}</Text>
            </View>
            <Text style={styles.number}>|</Text>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text style={styles.number}>₹ {price}/-</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', gap: 10, marginTop: 5}}>
            <TouchableOpacity
              style={styles.icon}
              onPress={handleDelete}
              disabled={isPending}>
              <Icon name="trash" size={20} color={'#fff'} />
            </TouchableOpacity>
            <View style={styles.icon}>
              <Icon name="create-outline" size={20} color={'#fff'} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default BookingCard;
