import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const DashboardBarChart = ({data}: {data: any}) => {
  const bookingsPerDay = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [
          data?.Sunday,
          data?.Monday,
          data?.Tuesday,
          data?.Wednesday,
          data?.Thursday,
          data?.Friday,
          data?.Saturday,
        ],
      },
    ],
  };

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleTouch = (index: number) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  return (
    <View>
      <BarChart
        data={bookingsPerDay}
        width={screenWidth - 32}
        height={250}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        showValuesOnTopOfBars={true}
        fromZero
        withInnerLines={false}
        withHorizontalLabels
        style={styles.chart}
      />
      <View style={styles.touchOverlay}>
        {bookingsPerDay.labels.map((label, index) => (
          <Text
            key={label}
            style={styles.touchableZone}
            onPress={() => handleTouch(index)}>
            {selectedIndex === index
              ? bookingsPerDay.datasets[0].data[index]
              : ''}
          </Text>
        ))}
      </View>
    </View>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
  labelColor: () => '#000',
  propsForLabels: {
    fontSize: 10,
  },
};

const styles = StyleSheet.create({
  chart: {
    borderRadius: 8,
  },
  touchOverlay: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  touchableZone: {
    width: 30,
    textAlign: 'center',
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default DashboardBarChart;
