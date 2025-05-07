import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Card, Divider, Icon, IconButton, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useAccountInfo} from '../api/account';

const AccountScreen = () => {
  const navigation = useNavigation();
  const {data} = useAccountInfo();
  console.log('data', data);
  const menuItems = [
    {id: '1', icon: 'map-outline', title: 'Venue Manage'},
    {id: '2', icon: 'people', title: 'Customers'},
    {id: '3', icon: 'cog', title: 'Settings'},
    {id: '4', icon: 'help-circle-outline', title: 'Help'},
    {id: '5', icon: 'log-out', title: 'Logout'},
  ];

  const renderMenuItem = ({item}: any) => (
    <View style={styles.menuItem}>
      <Icon source={item.icon} size={30} color="black" />
      <Text style={styles.menuText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View className="flex-row justify-between items-center">
            <Text style={styles.title}>Account</Text>
            <IconButton
              icon="pencil"
              size={20}
              iconColor="green"
              onPress={() => navigation.navigate('Profile')}
            />
          </View>
          <View style={styles.profileContainer}>
            <View style={styles.profileRound}></View>
            <View>
              <Text style={styles.userInfo}>Ishika</Text>
              <Text style={styles.userInfo}>8511779527</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
      <Divider style={styles.divider} />
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.menuContainer}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 4,
  },
  divider: {
    marginVertical: 8,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  menuContainer: {
    flexGrow: 1,
    gap: 35,
    padding: 20,
    backgroundColor: '#e2e1e1a6',
    borderRadius: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuText: {
    fontSize: 20,
    fontWeight: '600',
  },
  profileContainer: {
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
  },
  profileRound: {
    width: 70,
    height: 70,
    borderRadius: 60,
    backgroundColor: 'white',
  },
});

export default AccountScreen;
