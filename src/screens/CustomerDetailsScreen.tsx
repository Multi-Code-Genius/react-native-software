import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Text, Card, Avatar} from 'react-native-paper';
import {useGetCustomer} from '../api/customer';
import {useNavigation} from '@react-navigation/native';

const CustomerDetailsScreen = () => {
  const navigation = useNavigation();
  const {data} = useGetCustomer();
  console.log('data==========>>>>', data);

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('CustomerByID', {id: item?.id})}>
      <Card style={styles.card}>
        <Card.Title
          title={item?.name}
          subtitle={`Mobile: ${item?.mobile}`}
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
    </TouchableOpacity>
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={data?.customers || []}
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
