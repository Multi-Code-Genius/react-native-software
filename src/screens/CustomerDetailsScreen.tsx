import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Text, Card, Avatar} from 'react-native-paper';
import {useGetCustomer} from '../api/customer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/routes';

const CustomerDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {data, isLoading} = useGetCustomer();
  const customers = data?.customer || [];

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
            Total Spent Amount: ₹{item?.total_spent}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  if (!isLoading && customers.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/4076/4076501.png',
          }}
          style={styles.emptyImage}
          resizeMode="contain"
        />
        <Text style={styles.emptyTitle}>No Customers Found</Text>
        <Text style={styles.emptySubtitle}>
          You haven’t added any customers yet.
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={data?.customer || []}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f2f2f2',
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  addButton: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 16,
    borderRadius: 25,
  },
});

export default CustomerDetailsScreen;
