import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
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
import {styles} from '../styles/HomeScreenStyles';
import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import BookingStatusChart from '../components/BookingStatusChart';
import DashboardBarChart from '../components/DashboardBarChart';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const monthName = moment(date).format('MMMM').toLowerCase();

  const showPicker = useCallback((value: any) => setShow(value), []);

  const {
    data,
    refetch: refetchDashboard,
    isLoading,
  } = useDashboardData(monthName, '');

  const onValueChange = useCallback(
    (_: any, newDate: any) => {
      const selectedDate = newDate || date;
      showPicker(false);
      setDate(selectedDate);
      refetchDashboard();
    },
    [date, showPicker, refetchDashboard],
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchDashboard()]);
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      if (!isLoading) {
        refetchDashboard();
      }
    }, [refetchDashboard, monthName]),
  );

  const monthsBookingCount = data?.ThisMonthBookings.length ?? 0;
  const thisMonthBookings = data?.ThisMonthBookings ?? [];
  const lastSevenDaysBookings = data?.lastSevenDaysBookings ?? [];
  const monthTotalAmount = data?.MonthTotalBookingAmount ?? 0;
  const bookingsToday = data?.todaysBookings.length ?? 0;
  const newuserCount = data?.NewCustomers.length ?? 0;

  const analyticsData = [
    {
      id: '1',
      title: "Today's Booking",
      count: `${bookingsToday}`,
      icon: 'calendar',
    },
    {
      id: '2',
      title: 'Total Income This Month',
      count: `${monthTotalAmount}`,
      icon: 'cash',
    },
    {
      id: '3',
      title: 'Total Booking this Month',
      count: `${monthsBookingCount}`,
      icon: 'calendar',
    },
    {
      id: '4',
      title: 'New Customer This Month',
      count: `${newuserCount}`,
      icon: 'people-outline',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <AppHeader />

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
          {isLoading ? (
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator />
            </View>
          ) : (
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
                    onPress={() => showPicker(true)}
                    style={styles.dateButton}>
                    <Icon name="calendar" size={20} color="white" />
                    <Text style={styles.dateText}>
                      {moment(date).format('MM-YYYY')}
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
                    <BookingStatusChart thisMonthBookings={thisMonthBookings} />
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
                    <DashboardBarChart
                      lastSevenDaysBookings={lastSevenDaysBookings}
                    />
                  </View>
                </View>
              </View>
              <View style={{paddingVertical: 40, paddingHorizontal: 20}}>
                <Text style={styles.bottomText}>
                  With Love {'\n'} TurfKeeper
                </Text>
              </View>
            </View>
          )}
        </ImageBackground>
      </ScrollView>
      {show && (
        <MonthPicker onChange={onValueChange} value={date} mode="short" />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
