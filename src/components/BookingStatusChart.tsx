import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Circle, G} from 'react-native-svg';

const SIZE = 250;
const STROKE_WIDTH = 30;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function RoundedDonutChart({thisMonthBookings}: []) {
  let offset = 0;

  let cancel = 0;
  let confirm = 0;
  let pending = 0;

  thisMonthBookings.map((i: any) => {
    if (i.status === 'PENDING') {
      return pending++;
    } else if (i.status === 'CANCELLED') {
      return cancel++;
    } else if (i.status === 'CONFIRMED') {
      return confirm++;
    }
  });

  const total = cancel + confirm + pending;

  const chartdata = [
    {
      value: total > 0 ? (cancel / total) * 100 : 0,
      color: '#B2C000',
    },
    {
      value: total > 0 ? (pending / total) * 100 : 0,
      color: '#5E6600',
    },
    {
      value: total > 0 ? (confirm / total) * 100 : 0,
      color: '#383C1D',
    },
  ];

  return (
    <View
      style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.container}>
        <Svg width={SIZE} height={SIZE}>
          <G rotation="-90" origin={`${SIZE / 2}, ${SIZE / 2}`}>
            <Circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              stroke="#2e2e2e"
              strokeWidth={STROKE_WIDTH}
              fill="none"
            />
            {chartdata.map((slice, index) => {
              const strokeDasharray = `${
                (slice.value / 100) * CIRCUMFERENCE
              } ${CIRCUMFERENCE}`;
              const circle = (
                <Circle
                  key={index}
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  stroke={slice.color}
                  strokeWidth={STROKE_WIDTH}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={offset}
                  strokeLinecap="butt"
                  fill="none"
                />
              );
              offset -= (slice.value / 100) * CIRCUMFERENCE;
              return circle;
            })}
          </G>
        </Svg>

        <View style={styles.centerLabel}>
          <Text style={styles.count}>{thisMonthBookings.length}</Text>
          <Text style={styles.label}>Total{'\n'}Bookings</Text>
        </View>
      </View>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <Text style={[styles.legendCount, {color: '#B2C000'}]}>{cancel}</Text>
          <View style={styles.legendLabelContainer}>
            <View style={[styles.dot, {backgroundColor: '#B2C000'}]} />
            <Text style={styles.legendLabel}>Cancelled</Text>
          </View>
        </View>

        <View style={styles.legendItem}>
          <Text style={[styles.legendCount, {color: '#5E6600'}]}>
            {pending}
          </Text>
          <View style={styles.legendLabelContainer}>
            <View style={[styles.dot, {backgroundColor: '#5E6600'}]} />
            <Text style={styles.legendLabel}>Pending</Text>
          </View>
        </View>

        <View style={styles.legendItem}>
          <Text style={[styles.legendCount, {color: '#383C1D'}]}>
            {confirm}
          </Text>
          <View style={styles.legendLabelContainer}>
            <View style={[styles.dot, {backgroundColor: '#383C1D'}]} />
            <Text style={styles.legendLabel}>Confirmed</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLabel: {
    position: 'absolute',
    alignItems: 'center',
  },
  count: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  label: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },

  legendItem: {
    alignItems: 'center',
  },

  legendCount: {
    fontSize: 24,
    fontWeight: 'semibold',
    marginBottom: 4,
    fontFamily: 'Montserrat-Regular',
  },

  legendLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 8,
    marginRight: 5,
  },

  legendLabel: {
    color: '#888',
    fontSize: 12,
    fontWeight: 'medium',
    fontFamily: 'Montserrat-Regular',
  },
});
