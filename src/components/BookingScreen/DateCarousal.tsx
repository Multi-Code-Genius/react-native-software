import React, {useState, useMemo} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/Ionicons';

const DateCarousel = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const daysInMonth = useMemo(() => {
    const start = currentMonth.startOf('month');
    const today = dayjs();
    return Array.from({length: start.daysInMonth()}, (_, i) =>
      start.add(i, 'day'),
    ).filter(date => !date.isBefore(today, 'day'));
  }, [currentMonth]);

  const renderItem = ({item}: any) => {
    const isSelected = item.isSame(selectedDate, 'date');

    return (
      <TouchableOpacity
        style={[styles.dateItem, isSelected && styles.selectedDateItem]}
        onPress={() => setSelectedDate(item)}>
        <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
          {item.format('DD')}
        </Text>
        <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
          {item.format('ddd')}
        </Text>
      </TouchableOpacity>
    );
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prev => prev.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => prev.add(1, 'month'));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Icon name="chevron-back-outline" size={20} color={'#fff'} />
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {currentMonth.format('MMMM, YYYY')}
        </Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Icon name="chevron-forward-outline" size={20} color={'#fff'} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={daysInMonth}
        renderItem={renderItem}
        keyExtractor={item => item.format('YYYY-MM-DD')}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 8}}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default DateCarousel;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#1A1A1A',
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  monthText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  arrow: {
    fontSize: 18,
    color: '#fff',
  },
  dateItem: {
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 6,
    width: 60,
  },
  selectedDateItem: {
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 20,
    color: '#888888',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Regular',
  },
  dayText: {
    fontSize: 12,
    color: '#888888',
    fontWeight: 'medium',
    fontFamily: 'Montserrat-Regular',
  },
  selectedDateText: {
    color: '#000',
  },
  selectedDayText: {
    color: '#000',
  },
  separator: {
    width: 1.5,
    backgroundColor: '#444',
    height: '60%',
    alignSelf: 'center',
  },
});
