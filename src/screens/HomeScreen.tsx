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
import {BarChart} from 'react-native-chart-kit';
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
  const weekTotalAmount = data?.thisWeekTotalAmount ?? 0;
  const bookingsToday = data?.todaysBookingsCount ?? 0;
  const todaysTotalAmount = data?.todaysTotalAmount ?? 0;
  const newuserCount = data?.newUsersCount ?? 0;

  const metricCards = useMemo(
    () => [
      {
        id: '1',
        title: 'This Months Booking Count',
        value: `${monthsBookingCount}`,
        subtext: 'Increased by 25% from the last month',
        comment: 'Pretty good performance!',
        icon: 'pie-chart',
      },
      {
        id: '2',
        title: 'This Month Total amount',
        value: `${monthTotalAmount}`,
        subtext: '80% Increase in 20 Days',
        icon: 'stats-chart',
      },
      {
        id: '3',
        title: 'This Week Total amount',
        value: `${weekTotalAmount}`,
        subtext: '80% Increase than before',
        icon: 'stats-chart-outline',
      },
      {
        id: '4',
        title: 'Todays booking Count',
        value: `${bookingsToday}`,
        subtext: '80% Increase in 20 days',
        icon: 'pie-chart-outline',
      },
      {
        id: '5',
        title: 'Todays Total amount',
        value: `${todaysTotalAmount}`,
        subtext: '80% Increase in 20 days',
        icon: 'pie-chart-outline',
      },
    ],
    [
      monthsBookingCount,
      monthTotalAmount,
      weekTotalAmount,
      bookingsToday,
      todaysTotalAmount,
    ],
  );

  const renderMetricCard = ({item}: any) => (
    <Card style={styles.metricCard}>
      <Card.Content>
        <View style={styles.metricHeader}>
          <Text style={styles.metricTitle}>{item.title}</Text>
          <Icon source={item.icon} size={24} color="#4CAF50" />
        </View>
        <Text style={styles.metricValue}>{item.value}</Text>
        <Text style={styles.metricSubtext}>{item.subtext}</Text>
        {item.comment && (
          <Text style={styles.metricComment}>{item.comment}</Text>
        )}
      </Card.Content>
    </Card>
  );

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
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>New User Count</Text>
              <Icon source="bar-chart" size={24} color="#4CAF50" />
            </View>
            <View style={styles.performanceRow}>
              <Text style={styles.performanceScore}>{newuserCount}</Text>
              <View style={styles.performanceBadge}>
                <Text style={styles.badgeText}>Excellent</Text>
              </View>
            </View>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, {width: '91.2%'}]} />
              </View>
            </View>
          </Card.Content>
        </Card>

        <FlatList
          data={metricCards}
          renderItem={renderMetricCard}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.flatListContainer}
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
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    marginBottom: 16,
    fontSize: 22,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 20,
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
  flatListContainer: {
    paddingBottom: 16,
  },
  performanceCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    marginTop: 20,
  },
  metricCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  performanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  performanceScore: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 12,
  },
  performanceBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  badgeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  progressContainer: {
    marginTop: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
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
  metricTitle: {
    fontSize: 16,
    color: '#555',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  metricSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  metricComment: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    marginTop: 4,
    fontStyle: 'italic',
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
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
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    color: '#666',
  },
  activeTab: {
    backgroundColor: '#fff',
    borderRadius: 6,
    color: '#000',
    fontWeight: '500',
    elevation: 1,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
});

export default HomeScreen;
