import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Dialog,
  Divider,
  Icon,
  IconButton,
  Portal,
  Text,
} from 'react-native-paper';
import {useAccountInfo} from '../api/account';
import {useAccountStore} from '../store/accountStore';
import {useAuthStore} from '../store/authStore';

const AccountScreen = () => {
  const navigation = useNavigation();
  const {data, isPending} = useAccountInfo();
  const [visible, setVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      useAccountStore.getState().loadAccountData();
    }, []),
  );

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
    {id: '1', icon: 'map-outline', title: 'Venue Manage'},
    {id: '2', icon: 'people', title: 'Customers'},
    {id: '3', icon: 'cog', title: 'Settings'},
    {id: '4', icon: 'help-circle-outline', title: 'Help'},
    {id: '5', icon: 'log-out', title: 'Logout'},
  ];

  const renderMenuItem = ({item}: any) => {
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
      <View style={styles.card}>
        <View>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Account</Text>
            <IconButton
              icon="pencil"
              size={20}
              iconColor="green"
              onPress={() => (navigation as any).navigate('Profile', {data})}
            />
          </View>
          <View style={styles.profileContainer}>
            {isPending ? (
              <ActivityIndicator color="#0c0c0c" />
            ) : (
              <>
                {data?.user?.profile_pic ? (
                  <Image
                    source={{uri: data?.user?.profile_pic}}
                    style={styles.profileImage}
                  />
                ) : (
                  <View style={styles.profileRound} />
                )}
                <View>
                  <Text style={styles.userInfo}>
                    {data?.user?.name || 'Name'}
                  </Text>
                  <Text style={styles.userInfo}>
                    {data?.user?.mobileNumber || 'Mobile Number'}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
      </View>

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
    backgroundColor: '#a7a6a628',
    padding: 10,
    borderRadius: 10,
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
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 60,
    backgroundColor: 'white',
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
    backgroundColor: 'white',
  },
});

export default AccountScreen;
