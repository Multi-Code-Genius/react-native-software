import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {ActivityIndicator, Card, Text, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDashboardData} from '../api/dashboard';
import DashboardBarChart from '../components/DashboardBarChart';
import {useAccountLogic} from '../hooks/useAccountLogic';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const {account, isLoading: accountLoading} = useAccountLogic();

  const [selectedVenue, setSelectedVenue] = useState<string>('');
  const navigation = useNavigation();

  useEffect(() => {
    if (account?.games?.length > 0) {
      setSelectedVenue(account.games[0].id);
    }
  }, [account]);
  const {data, refetch, isLoading} = useDashboardData(
    selectedVenue,
    account?.user?.id || '',
  );

  useEffect(() => {
    if (selectedVenue) {
      refetch();
    }
  }, [selectedVenue, refetch]);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    (await !isLoading) && refetch();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      !isLoading && refetch();
    }, [refetch]),
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

  if (accountLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <Title style={styles.heading}>Dashboard</Title>
        {/* Venue Switch Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}>
          {account &&
            (account?.games || []).map((venue: any) => (
              <TouchableOpacity
                key={venue.id}
                style={[
                  styles.tabButton,
                  selectedVenue === venue.id && styles.tabButtonActive,
                ]}
                onPress={() => setSelectedVenue(venue.id)}>
                <Text
                  style={[
                    styles.tabButtonText,
                    selectedVenue === venue.id && styles.tabButtonTextActive,
                  ]}>
                  {venue.name}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>

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

          <Card style={styles.card}>
            <Card.Content>
              <Title>{bookingsToday} Bookings</Title>
              <Text>Today</Text>
            </Card.Content>
          </Card>
        </View>

        <Card
          style={{
            width: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'green',
          }}
          onPress={() =>
            (navigation as any).navigate('bookingData', {
              venueId: selectedVenue,
              price: 2500,
            })
          }>
          <Card.Content>
            <Title>Bookings</Title>
            {/* <Text>Today</Text> */}
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
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#ddd',
    borderRadius: 20,
    marginRight: 8,
  },
  tabButtonActive: {
    backgroundColor: '#2196f3',
  },
  tabButtonText: {
    color: '#000',
    fontWeight: '500',
  },
  tabButtonTextActive: {
    color: '#fff',
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
});

export default HomeScreen;
