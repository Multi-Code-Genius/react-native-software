import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Circle, G} from 'react-native-svg';
import {useTheme} from '../context/ThemeContext';

const SIZE = 250;
const STROKE_WIDTH = 30;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface RoundedDonutChartProps {
  thisMonthBookings: any[];
}

export default function RoundedDonutChart({
  thisMonthBookings,
}: RoundedDonutChartProps) {
  let offset = 0;

  const {theme} = useTheme();

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
      color: theme.colors.brandYellow,
    },
    {
      value: total > 0 ? (pending / total) * 100 : 0,
      color: theme.colors.brandGreen,
    },
    {
      value: total > 0 ? (confirm / total) * 100 : 0,
      color: theme.colors.brandViolet,
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
              stroke={theme.colors.border}
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
          <Text style={[styles.legendCount, {color: theme.colors.brandYellow}]}>
            {cancel}
          </Text>
          <View style={styles.legendLabelContainer}>
            <View
              style={[styles.dot, {backgroundColor: theme.colors.brandYellow}]}
            />
            <Text style={styles.legendLabel}>Cancelled</Text>
          </View>
        </View>

        <View style={styles.legendItem}>
          <Text style={[styles.legendCount, {color: theme.colors.brandGreen}]}>
            {pending}
          </Text>
          <View style={styles.legendLabelContainer}>
            <View
              style={[styles.dot, {backgroundColor: theme.colors.brandGreen}]}
            />
            <Text style={styles.legendLabel}>Pending</Text>
          </View>
        </View>

        <View style={styles.legendItem}>
          <Text style={[styles.legendCount, {color: theme.colors.brandViolet}]}>
            {confirm}
          </Text>
          <View style={styles.legendLabelContainer}>
            <View
              style={[styles.dot, {backgroundColor: theme.colors.brandViolet}]}
            />
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
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
  },
  label: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
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
    marginBottom: 4,
    fontFamily: 'Montserrat-SemiBold',
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
    fontFamily: 'Montserrat-Medium',
  },
});
