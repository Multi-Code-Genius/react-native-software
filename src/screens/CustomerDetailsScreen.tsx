import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Text, Card, Avatar} from 'react-native-paper';
import {useGetCustomer} from '../api/customer';

const CustomerDetailsScreen = () => {
  const {data} = useGetCustomer();
  console.log('data==========>>>>', data);

  const renderItem = ({item}: any) => (
    <Card style={styles.card}>
      <Card.Title
        title={item?.name}
        subtitle={`Mobile: ${item?.mobileNumber}`}
        left={props => (
          <Avatar.Text
            {...props}
            label={item?.name?.charAt(0)?.toUpperCase() || 'U'}
            size={48}
            style={styles.avatar}
          />
        )}
      />
      <Card.Content>
        <Text variant="titleMedium">
          Total Bookings: {item?.bookings?.length}
        </Text>
        <Text variant="titleMedium">
          Total Spent Amount: ₹{item?.totalSpentAmount}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={data?.clientsWithTotalAmount || []}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={{height: 16}} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 3,
  },
  avatar: {
    backgroundColor: '#6200ee',
  },
});

export default CustomerDetailsScreen;
