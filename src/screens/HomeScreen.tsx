import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {Card, Text, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDashboardData} from '../api/dashboard';
import DashboardBarChart from '../components/DashboardBarChart';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const {data, refetch, isLoading} = useDashboardData(
    '7eb4708b-463e-41e0-be17-ea323cd1a172',
  );

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    (await !isLoading) && refetch();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      !isLoading && refetch();
    }, [refetch, isLoading]),
  );

  const todayEarnings = data?.todaysBookingsAmount ?? 0;
  const weeklyEarnings = data?.thisWeekBookingsTotalAmount ?? 0;
  const monthlyEarnings = data?.thisMonthBookingsTotalAmount ?? 0;
  const bookingsToday = data?.todaysBookingsCount ?? 0;

  const statusData = [
    {
      name: 'Confirmed',
      population: data?.statusCounts?.CONFIRMED ?? 0,
      color: '#4caf50',
      legendFontColor: '#000',
      legendFontSize: 12,
    },
    {
      name: 'Cancelled',
      population: data?.statusCounts?.CANCELLED ?? 0,
      color: '#f44336',
      legendFontColor: '#000',
      legendFontSize: 12,
    },
    {
      name: 'Pending',
      population: data?.statusCounts?.PENDING ?? 0,
      color: '#ff9800',
      legendFontColor: '#000',
      legendFontSize: 12,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <Title style={styles.heading}>Dashboard</Title>

        <View style={styles.cardRow}>
          <Card style={styles.card}>
            <Card.Content>
              <Title>₹{todayEarnings}</Title>
              <Text>Today's Earnings</Text>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Title>₹{weeklyEarnings}</Title>
              <Text>This Week</Text>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Title>₹{monthlyEarnings}</Title>
              <Text>This Month</Text>
            </Card.Content>
          </Card>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Title>{bookingsToday} Bookings</Title>
            <Text>Today</Text>
          </Card.Content>
        </Card>

        <Title style={styles.sectionTitle}>Booking Status</Title>
        <PieChart
          data={statusData}
          width={screenWidth - 32}
          height={200}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          chartConfig={chartConfig}
          hasLegend
        />

        <Title style={styles.sectionTitle}>Bookings This Week</Title>
        <DashboardBarChart data={data?.weeklyBookingsCountByDay} />
      </ScrollView>
    </SafeAreaView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
  labelColor: () => '#000',
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#2196f3',
  },
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
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
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    marginBottom: 16,
    fontSize: 22,
  },
  cardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 12,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 18,
  },
  chart: {
    borderRadius: 8,
    marginBottom: 30,
  },
});

export default HomeScreen;
