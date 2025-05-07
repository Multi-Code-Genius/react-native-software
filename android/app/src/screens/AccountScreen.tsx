import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Divider, Icon, List, Text } from 'react-native-paper';

const AccountScreen = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Account</Text>
          <Text style={styles.userInfo}>Ishika</Text>
          <Text style={styles.userInfo}>8511779527</Text>
        </Card.Content>
      </Card>
      <Divider style={styles.divider} />

      <Card style={styles.card}>
        <Card.Content>
          <View className='flex flex-row gap-4'>
            <Icon source='map-outline' size={20} color='black' />
            <Text>Venue Manage</Text>
          </View>
          {/* <View className='flex flex-row gap-4'>
            <Icon source='account' size={20} color='black' />
            <Text>Venue Manage</Text>
          </View> */}
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 8,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
});

export default AccountScreen;