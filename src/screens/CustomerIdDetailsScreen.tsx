import React from 'react';
import {useRoute} from '@react-navigation/native';
import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import {Text, Card, Divider, ActivityIndicator} from 'react-native-paper';
import {useCustomerById} from '../api/customer';

export const CustomerIdDetailsScreen = () => {
  const route = useRoute();
  const {id} = route.params as {id: string};
  const {data, isLoading, error} = useCustomerById(id);

  const customer = data?.customer;
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  const renderItem = ({item}: any) => (
    <View key={item.id} style={styles.bookingItem}>
      <View style={styles.bookingRow}>
        <Text style={styles.bookingLabel}>Game:</Text>
        <Text style={styles.bookingValue}>{item.game?.name}</Text>
      </View>
      <View style={styles.bookingRow}>
        <Text style={styles.bookingLabel}>Date:</Text>
        <Text style={styles.bookingValue}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.bookingRow}>
        <Text style={styles.bookingLabel}>Time:</Text>
        <Text style={styles.bookingValue}>
          {new Date(item.startTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          -{' '}
          {new Date(item.endTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
      <View style={styles.bookingRow}>
        <Text style={styles.bookingLabel}>Amount:</Text>
        <Text style={styles.bookingValue}>₹{item.totalAmount}</Text>
      </View>
      <View style={styles.bookingRow}>
        <Text style={styles.bookingLabel}>Status:</Text>
        <Text
          style={[
            styles.bookingValue,
            {
              color:
                item.status === 'PENDING'
                  ? 'orange'
                  : item.status === 'CANCELLED'
                  ? 'red'
                  : 'green',
            },
          ]}>
          {item.status}
        </Text>
      </View>
      <View style={styles.separator} />
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={customer?.bookings || []}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={{height: 16}} />}
      ListHeaderComponent={() => (
        <View>
          <Card style={styles.customerCard}>
            <Card.Title title={customer?.name} />
            <Card.Content>
              <Text style={styles.infoText}>Mobile: {customer?.mobile}</Text>
              <Text style={styles.infoText}>
                Total Spent: ₹{customer?.totalSpent}
              </Text>
            </Card.Content>
          </Card>
          <Text style={styles.sectionTitle}>Bookings</Text>
        </View>
      )}
    />
  );
};

export default CustomerIdDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  customerCard: {
    marginBottom: 24,
    borderRadius: 12,
    backgroundColor: 'white',
  },

  infoText: {
    marginVertical: 4,
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  bookingItem: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
  },
  bookingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  bookingLabel: {
    fontWeight: 'bold',
    color: '#444',
  },
  bookingValue: {
    color: '#555',
  },
  separator: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
