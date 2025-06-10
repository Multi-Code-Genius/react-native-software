import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Rect} from 'react-native-svg';
import {isSameDay, subDays} from 'date-fns';

const generatePastWeekBookingData = (bookings: any[]) => {
  const today = new Date();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const result: {day: string; value: number}[] = [];

  for (let i = 6; i >= 0; i--) {
    const currentDate = subDays(today, i);
    const dayIndex = currentDate.getDay();
    const dayName = daysOfWeek[dayIndex];

    const count = bookings.filter(booking =>
      isSameDay(new Date(booking.date), currentDate),
    ).length;

    result.push({day: dayName, value: count});
  }

  return result;
};

const MAX_VALUE = 6;
const BAR_WIDTH = 18;
const CHART_HEIGHT = 150;

export default function DashboardBarChart({lastSevenDaysBookings}: any) {
  const data = generatePastWeekBookingData(lastSevenDaysBookings);

  return (
    <View style={styles.container}>
      <View style={styles.chartArea}>
        {data.map((item, index) => {
          const filledHeight = (item.value / MAX_VALUE) * CHART_HEIGHT;
          return (
            <View key={index} style={styles.barContainer}>
              <Svg height={CHART_HEIGHT} width={BAR_WIDTH}>
                <Rect
                  x={0}
                  y={0}
                  rx={10}
                  width={BAR_WIDTH}
                  height={CHART_HEIGHT}
                  fill="#383C1D"
                />
                <Rect
                  x={0}
                  y={CHART_HEIGHT - filledHeight}
                  rx={10}
                  width={BAR_WIDTH}
                  height={filledHeight}
                  fill="#B2C000"
                />
              </Svg>
              <Text style={styles.valueLabel}>
                {item.value > 0 ? item.value : ''}
              </Text>
              <Text style={styles.dayLabel}>{item.day}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  chartArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  barContainer: {
    alignItems: 'center',
  },
  valueLabel: {
    position: 'absolute',
    top: -20,
    color: '#B2C000',
    fontWeight: 'bold',
  },
  dayLabel: {
    marginTop: 8,
    color: 'white',
  },
});
