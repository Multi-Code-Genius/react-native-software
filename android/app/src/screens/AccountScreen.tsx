import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  Divider,
  Icon,
  IconButton,
  Text,
  Dialog,
  Portal,
  Button,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAccountInfo } from '../api/account';
import { useAuthStore } from '../store/authStore';

const AccountScreen = () => {
  const navigation = useNavigation();
  const { data } = useAccountInfo();
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleLogout = async () => {
    try {
      await useAuthStore.getState().logout();
      hideDialog();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  const menuItems = [
    { id: '1', icon: 'map-outline', title: 'Venue Manage' },
    { id: '2', icon: 'people', title: 'Customers' },
    { id: '3', icon: 'cog', title: 'Settings' },
    { id: '4', icon: 'help-circle-outline', title: 'Help' },
    { id: '5', icon: 'log-out', title: 'Logout' },
  ];

  const renderMenuItem = ({ item }: any) => {
    const onPress = () => {
      if (item.title === 'Logout') {
        showDialog();
      } else {
        console.log(`${item.title} clicked`);
      }
    };

    return (
      <TouchableOpacity onPress={onPress} style={styles.menuItem}>
        <Icon source={item.icon} size={30} color="black" />
        <Text style={styles.menuText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Account</Text>
            <IconButton
              icon="pencil"
              size={20}
              iconColor="green"
              onPress={() => (navigation as any).navigate('Profile')}
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

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Title>Confirm Logout</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to logout?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleLogout}>Logout</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    gap: 20,
    padding: 10,
    borderRadius: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a7a6a628',
    borderColor: '#dddcdc',
    padding: 15,
    gap: 15,
    width: '100%',
    borderRadius: 10,
  },
  menuText: {
    fontSize: 15,
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: 'white'
  }
});

export default AccountScreen;
