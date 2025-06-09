import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ImageBackground,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDashboardData} from '../api/dashboard';
import {useAccountLogic} from '../hooks/useAccountLogic';
import {useGetVenue} from '../api/vanue';
import {styles} from '../styles/HomeScreenStyles';
import AppHeader from '../components/AppHeader';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import BookingStatusChart from '../components/BookingStatusChart';
import DashboardBarChart from '../components/DashboardBarChart';

const HomeScreen = () => {
  const {account, isLoading: accountLoading} = useAccountLogic();
  const [selectedVenue, setSelectedVenue] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);
  const {data: venuedata, refetch: refetchVenue} = useGetVenue();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
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
      name: 'Cancelled',
      population: data?.statusCounts?.CANCELLED ?? 0,
      color: '#6e722d',
      legendFontColor: '#ffffff',
      legendFontSize: 12,
    },
    {
      name: 'Pending',
      population: data?.statusCounts?.PENDING ?? 0,
      color: '#c8be2e',
      legendFontColor: '#ffffff',
      legendFontSize: 12,
    },
    {
      name: 'Confirmed',
      population: data?.statusCounts?.CONFIRMED ?? 0,
      color: '#d2e403',
      legendFontColor: '#ffffff',
      legendFontSize: 12,
    },
  ];

  const analyticsData = [
    {
      id: '1',
      title: "Today's Booking",
      count: `${newuserCount}`,
      icon: 'calendar',
    },
    {
      id: '2',
      title: 'Total Income This Month',
      count: `${monthsBookingCount}`,
      icon: 'cash',
    },
    {
      id: '3',
      title: 'Total Booking this Month',
      count: `${monthTotalAmount}`,
      icon: 'calendar',
    },
    {
      id: '4',
      title: 'New Customer This Month',
      count: `${bookingsToday}`,
      icon: 'people-outline',
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

      {/* {!hasVenues ? ( */}

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <ImageBackground
          source={require('../assets/ScreenShaded.png')}
          style={styles.headerGlow}
          resizeMode="cover">
          <View>
            <View
              style={{
                padding: 15,
                borderBottomColor: '#252525',
                borderBottomWidth: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 20,
                  alignItems: 'flex-end',
                }}>
                <Text style={styles.heading}>ANALYTICS</Text>
                <TouchableOpacity
                  onPress={() => setOpen(true)}
                  style={styles.dateButton}>
                  <Icon name="calendar" size={20} color="white" />
                  <Text style={styles.dateText}>
                    {date.toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </Text>
                  <Icon name="chevron-down" size={16} color="white" />
                </TouchableOpacity>
              </View>

              <View style={styles.analyticsGrid}>
                {analyticsData.map(item => (
                  <View key={item.id} style={styles.analyticsBox}>
                    <Text style={styles.analyticsLabel}>{item.title}</Text>
                    <View style={styles.iconWrap}>
                      <Icon name={item.icon} size={22} color="#fff" />
                      <Text style={styles.analyticsValue}>{item.count}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.chartcontainer}>
              <View style={{padding: 20, gap: 16}}>
                <Text style={styles.heading}>ACTIVITY</Text>
                <View style={styles.ChartCard}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      paddingBottom: 16,
                    }}>
                    <View style={{gap: 10, flexDirection: 'row'}}>
                      <Icon name="calendar" size={20} color="white" />
                      <Text style={styles.dateText}>Booking Status</Text>
                    </View>
                  </View>
                  <BookingStatusChart />
                </View>
              </View>
            </View>
            <View style={styles.chartcontainer}>
              <View style={{padding: 20, gap: 16}}>
                <View style={styles.ChartCard}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      paddingBottom: 16,
                    }}>
                    <View style={{gap: 10, flexDirection: 'row'}}>
                      <Icon name="calendar" size={20} color="white" />
                      <Text style={styles.dateText}>Weekly Booking</Text>
                    </View>
                  </View>
                  <DashboardBarChart />
                </View>
              </View>
            </View>
            <View style={{paddingVertical: 40, paddingHorizontal: 20}}>
              <Text style={styles.bottomText}>With Love {'\n'} TurfKeeper</Text>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={selectedDate => {
          setOpen(false);
          setDate(selectedDate);
        }}
        onCancel={() => setOpen(false)}
        theme="dark"
      />

      {/* ) : (
        <WelcomeTab />
      )} */}
    </SafeAreaView>
  );
};

export default HomeScreen;
