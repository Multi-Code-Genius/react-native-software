import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Rect} from 'react-native-svg';

const data = [
  {day: 'Mon', value: 2},
  {day: 'Tue', value: 4},
  {day: 'Wed', value: 1},
  {day: 'Thu', value: 3},
  {day: 'Fri', value: 1},
  {day: 'Sat', value: 5},
  {day: 'Sun', value: 6},
];

const MAX_VALUE = 6;
const BAR_WIDTH = 18;
const CHART_HEIGHT = 150;

export default function DashboardBarChart() {
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
