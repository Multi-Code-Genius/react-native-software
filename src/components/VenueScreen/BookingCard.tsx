import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from '../../styles/bookingDetailStyles';

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
}

const BookingCard: React.FC<BookingCardProps> = ({
  startTime,
  endTime,
  bgColor = '#784847',
  name,
  phone,
  duration,
  price,
  sport,
  isAvailable,
}) => {
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
          <Icon name="add-circle-outline" size={20} color={'#fff'} />
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
            <View style={styles.icon}>
              <Icon name="trash" size={20} color={'#fff'} />
            </View>
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
