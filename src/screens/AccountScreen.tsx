import React, {useState} from 'react';
import {View, FlatList, StyleSheet, Image} from 'react-native';
import {
  Text,
  Avatar,
  Divider,
  Dialog,
  Portal,
  Button,
  TouchableRipple,
  IconButton,
  ActivityIndicator,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAccountInfo} from '../api/account';
import {useAuthStore} from '../store/authStore';

const AccountScreen = () => {
  const {data, isPending, refetch} = useAccountInfo();
  const navigation = useNavigation();
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
    {id: '1', icon: 'map-outline', title: 'Venue Manage'},
    {id: '2', icon: 'people', title: 'Customers'},
    {id: '3', icon: 'cog', title: 'Settings'},
    {id: '4', icon: 'help-circle-outline', title: 'Help'},
    {id: '5', icon: 'log-out', title: 'Logout'},
  ];

  const handleItemPress = (title: string) => {
    switch (title) {
      case 'Venue Manage':
        navigation.navigate('VenueManage');
        break;
      case 'Customers':
        navigation.navigate('Customers');
        break;
      case 'Logout':
        showDialog();
        break;
      default:
        console.log(`${title} clicked`);
    }
  };

  const renderItem = ({item}: any) => (
    <TouchableRipple
      onPress={() => handleItemPress(item.title)}
      rippleColor="rgba(0, 0, 0, .1)"
      style={styles.menuItem}>
      <View style={styles.menuRow}>
        <View style={styles.menuLeft}>
          <View style={styles.iconContainer}>
            <Icon name={item.icon} size={20} color="#4686e5" />
          </View>
          <Text style={styles.menuTitle}>{item.title}</Text>
        </View>
        <Icon name="chevron-forward" size={18} color="#999" />
      </View>
    </TouchableRipple>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Account</Text>
        </View>
        <View style={styles.profileContainer}>
          {isPending ? (
            <ActivityIndicator color="#0c0c0c" />
          ) : (
            <>
              {data?.user?.profile_pic ? (
                <View style={styles.profileImageWrapper}>
                  <Image
                    source={{uri: data?.user?.profile_pic}}
                    style={styles.profileImage}
                  />
                  <IconButton
                    icon="pencil"
                    size={20}
                    iconColor="white"
                    onPress={() =>
                      (navigation as any).navigate('Profile', {data})
                    }
                    style={styles.iconOverlay}
                  />
                </View>
              ) : (
                <View style={styles.profileImageWrapper}>
                  <View style={styles.profileImage} />
                  <IconButton
                    icon="pencil"
                    size={20}
                    iconColor="white"
                    onPress={() =>
                      (navigation as any).navigate('Profile', {data})
                    }
                    style={styles.iconOverlay}
                  />
                </View>
              )}
            </>
          )}
        </View>
        <Text style={styles.userName}>{data?.user?.name || 'User Name'}</Text>
        <Text style={styles.userEmail}>
          {data?.user?.email || 'example@email.com'}
        </Text>
      </View>

      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.menuList}
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

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dialog: {
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '90%',
    margin: 'auto',
  },
  profileContainer: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  menuList: {
    padding: 16,
  },
  menuItem: {
    backgroundColor: '#f9f9f9',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  profileImageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 80,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'relative',
  },
  iconOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0c0c0c',
    borderRadius: 10,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 80,
    backgroundColor: 'white',
  },
});
