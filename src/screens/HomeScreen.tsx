import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, TouchableOpacity, View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Icon,
  IconButton,
  Text,
  Title,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDashboardData} from '../api/dashboard';
import {useAccountLogic} from '../hooks/useAccountLogic';
import {useGetVenue} from '../api/vanue';
import WelcomeTab from '../components/WelcomeTab';
import {downloadAndOpenPdf} from '../utils/downloadPdf';
import {useToast} from '../context/ToastContext';
import {styles} from '../styles/HomeScreenStyles';
import LayoutWithHeader from '../components/LayoutWithHeader';
import AppHeader from '../components/AppHeader';

const HomeScreen = () => {
  const {account, isLoading: accountLoading} = useAccountLogic();
  const [selectedVenue, setSelectedVenue] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);
  const {data: venuedata, refetch: refetchVenue} = useGetVenue();
  const {showToast} = useToast();

  const hasVenues =
    Array.isArray(venuedata?.venues) && venuedata.venues.length > 0;

  useEffect(() => {
    if (account?.games?.length > 0) {
      setSelectedVenue(account.games[0].id);
    }
  }, [account]);

  const {
    data,
    refetch: refetchDashboard,
    isLoading,
  } = useDashboardData(selectedVenue, account?.id || '');
  const navigation = useNavigation();

  useEffect(() => {
    if (selectedVenue) {
      refetchDashboard();
    }
  }, [selectedVenue, refetchDashboard]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchVenue(), refetchDashboard()]);
    setRefreshing(false);
  };
  useFocusEffect(
    useCallback(() => {
      if (!isLoading) {
        refetchDashboard();
        refetchVenue();
      }
    }, [refetchDashboard, refetchVenue]),
  );

  const monthsBookingCount = data?.ThisMonthBookings.length ?? 0;
  const monthTotalAmount = data?.MonthTotalBookingAmount ?? 0;
  const bookingsToday = data?.todaysBookings.length ?? 0;
  const newuserCount = data?.NewCustomers.length ?? 0;

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
      <AppHeader />
      {hasVenues ? (
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
              <Button
                mode="outlined"
                style={styles.button}
                onPress={() => downloadAndOpenPdf(selectedVenue, showToast)}>
                Export
              </Button>
              <Button mode="contained" style={styles.button}>
                Create
              </Button>
              <IconButton
                icon="add-circle"
                onPress={() => (navigation as any).navigate('Addvenue')}
                size={30}
              />
            </View>
          </View>
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.tabContainer}>
              {venuedata &&
                (venuedata?.venues || []).map((venue: any) => (
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
                        selectedVenue === venue.id &&
                          styles.tabButtonTextActive,
                      ]}>
                      {venue.name}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>

          <Button
            mode="contained"
            style={styles.book}
            onPress={() =>
              (navigation as any).navigate('bookingData', {
                venueId: selectedVenue,
              })
            }>
            Book Game
          </Button>
          <Card style={styles.performanceCard}>
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
          </Card>
        </ScrollView>
      ) : (
        <WelcomeTab />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
