import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Card, Divider, Icon, List, Text, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const AccountScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>Account</Text>
            <Text style={styles.userInfo}>Ishika</Text>
            <Text style={styles.userInfo}>8511779527</Text>
          </Card.Content>
        </Card>
        <Divider style={styles.divider} />

        <View style={styles.menuContainer}>
          <View style={styles.menuItem}>
            <Icon source='map-outline' size={30} color='black' />
            <Text style={styles.menuText}>Venue Manage</Text>
          </View>
          <View style={styles.menuItem}>
            <Icon source='people' size={30} color='black' />
            <Text style={styles.menuText}>Customers</Text>
          </View>
          <View style={styles.menuItem}>
            <Icon source='cog' size={30} color='black' />
            <Text style={styles.menuText}>Settings</Text>
          </View>
          <View style={styles.menuItem}>
            <Icon source='help-circle-outline' size={30} color='black' />
            <Text style={styles.menuText}>Help</Text>
          </View>
          <View style={styles.menuItem}>
            <Icon source='log-out' size={30} color='black' />
            <Text style={styles.menuText}>Logout</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
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
    flex: 1,
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
    fontWeight: 'semibold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profileImage: {
    marginRight: 16,
  },
  userInfoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    color: '#666',
  },
});

export default AccountScreen;