import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {BarChart, PieChart} from 'react-native-chart-kit';
import {
  ActivityIndicator,
  Button,
  Card,
  Icon,
  Text,
  Title,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDashboardData} from '../api/dashboard';
import {useAccountLogic} from '../hooks/useAccountLogic';
import DashboardBarChart from '../components/DashboardBarChart';
const screenWidth = Dimensions.get('window').width;
const HomeScreen = () => {
  const {account, isLoading: accountLoading} = useAccountLogic();
  const [selectedVenue, setSelectedVenue] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (account?.games?.length > 0) {
      setSelectedVenue(account.games[0].id);
    }
  }, [account]);

  const {data, refetch, isLoading} = useDashboardData(
    selectedVenue,
    account?.user?.id || '',
  );

  console.log('data>>dashboard', data);

  useEffect(() => {
    if (selectedVenue) {
      refetch();
    }
  }, [selectedVenue, refetch]);

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

  const monthsBookingCount = data?.thisMonthBookingsCount ?? 0;
  const monthTotalAmount = data?.thisMonthTotalAmount ?? 0;
  const bookingsToday = data?.todaysBookingsCount ?? 0;
  const newuserCount = data?.newUsersCount ?? 0;

  const statusData = [
    {
      name: 'Confirmed',
      population: data?.statusCounts?.CONFIRMED ?? 0,
      color: '#f3f04d',
      legendFontColor: '#000',
      legendFontSize: 12,
    },
    {
      name: 'Cancelled',
      population: data?.statusCounts?.CANCELLED ?? 0,
      color: '#f36b62',
      legendFontColor: '#000',
      legendFontSize: 12,
    },
    {
      name: 'Pending',
      population: data?.statusCounts?.PENDING ?? 0,
      color: '#f5b556',
      legendFontColor: '#000',
      legendFontSize: 12,
    },
    {
      name: 'Completed',
      population: data?.statusCounts?.COMPLETED ?? 0,
      color: '#69b86c',
      legendFontColor: '#000',
      legendFontSize: 12,
    },
  ];

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

  const analyticsData = [
    {
      id: '1',
      title: 'New Players count',
      count: `${newuserCount}`,
      icon: 'person',
    },
    {
      id: '2',
      title: "This Month's Booking",
      count: `${monthsBookingCount}`,
      icon: 'calendar',
    },
    {
      id: '3',
      title: "This Month's Total Amount",
      count: `${monthTotalAmount}`,
      icon: 'cash',
    },
    {
      id: '4',
      title: "Today's Booking",
      count: `${bookingsToday}`,
      icon: 'calendar-number',
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
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <Title style={styles.heading}>Dashboard</Title>

        <View style={styles.headcontainer}>
          <Text style={styles.Heading1}>Welcome Back, John...👋</Text>
          <Text style={styles.paragraph}>
            There is the latest update for the last 7 days. Check now.
          </Text>
          <View style={styles.buttoncontainer}>
            <Button mode="outlined" style={styles.button}>
              Export
            </Button>
            <Button mode="contained" style={styles.button}>
              Create
            </Button>
          </View>
        </View>

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
        <Card style={styles.performanceCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>📊 Analytics</Text>

            <View style={styles.analyticsGrid}>
              {analyticsData.map(item => (
                <View key={item.id} style={styles.analyticsBox}>
                  <View style={styles.iconWrap}>
                    <Icon source={item.icon} size={22} color="#fff" />
                  </View>
                  <Text style={styles.analyticsValue}>{item.count}</Text>
                  <Text style={styles.analyticsLabel}>{item.title}</Text>
                </View>
              ))}
            </View>
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

        <Text style={styles.title}>Working Hours Statistics</Text>
        <View style={styles.header}>
          <DashboardBarChart data={data?.weeklyBookingsCountByDay} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  performanceCard: {
    borderRadius: 16,
    marginHorizontal: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    elevation: 4,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: '#333',
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  analyticsBox: {
    width: '47%',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 1},
  },
  iconWrap: {
    backgroundColor: '#4caf50',
    borderRadius: 20,
    padding: 6,
    marginBottom: 8,
  },
  analyticsValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  analyticsLabel: {
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
    marginTop: 4,
  },
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 18,
  },
  heading: {
    marginBottom: 16,
    fontSize: 22,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 30,
  },
  headcontainer: {
    gap: 15,
  },
  buttoncontainer: {
    flexDirection: 'row',
    gap: 8,
  },
  Heading1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 15,
  },
  button: {
    width: '50%',
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#ddd',
    borderRadius: 20,
    marginRight: 8,
  },
  tabButtonActive: {
    backgroundColor: '#4CAF50',
  },
  tabButtonText: {
    color: '#000',
    fontWeight: '500',
  },
  tabButtonTextActive: {
    color: '#fff',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
});

export default HomeScreen;
