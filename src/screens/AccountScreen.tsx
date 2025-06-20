import React, {useState} from 'react';
import {
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Text,
  Dialog,
  Portal,
  Button,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAccountInfo} from '../api/account';
import {useAuthStore} from '../store/authStore';
import {accountStyle} from '../styles/AccountScreenStyles';
import {RootStackParamList} from '../navigation/routes';
import AppHeader from '../components/AppHeader';
import {useTheme} from '../context/ThemeContext';

const AccountScreen = () => {
  const {data, isPending} = useAccountInfo();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [visible, setVisible] = useState(false);

  const {theme, toggleTheme} = useTheme();
  const styles = accountStyle(theme);

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
    {id: '1', icon: 'person-outline', title: 'Customers'},
    {id: '2', icon: 'help-circle-outline', title: 'Help'},
    {id: '3', icon: 'moon-outline', title: 'BlackTheme'},
    {id: '4', icon: 'log-out', title: 'Logout'},
  ];

  const handleItemPress = (title: string) => {
    switch (title) {
      case 'Customers':
        navigation.navigate('CustomerDetails' as never);
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
          <Icon name={item.icon} size={20} color={theme.colors.text} />
          <Text style={styles.menuTitle}>{item.title}</Text>
        </View>
        {item.title !== 'Logout' && item.title !== 'BlackTheme' && (
          <Icon name="chevron-forward" size={18} color="#999" />
        )}
        {item.title === 'BlackTheme' && (
          <Switch
            value={theme.dark}
            onValueChange={toggleTheme}
            color="#B2C000"
            trackColor={{false: '#444', true: '#737A1A'}}
          />
        )}
      </View>
    </TouchableRipple>
  );

  return (
    <View style={styles.container}>
      <AppHeader />
      <ImageBackground
        source={theme.dark && require('../assets/ScreenShaded.png')}
        style={styles.headerGlow}
        resizeMode="cover">
        {isPending ? (
          <View
            style={{
              width: '100%',
              height: '90%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator />
          </View>
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.title1}>Hit Wicket Turf & Sports Club</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  justifyContent: 'center',
                }}>
                <Text style={styles.userEmail}>{data?.user?.name}</Text>
                <Text style={styles.userEmail}>|</Text>
                <Text style={styles.userName}>{data?.user?.phone}</Text>
              </View>
              <TouchableOpacity
                style={styles.editProfile}
                onPress={() => {
                  console.log('Edit Profile Pressed');
                  navigation.navigate('ProfileInfo' as never);
                }}>
                <Icon name={'create'} size={20} color={theme.colors.text} />
                <Text style={styles.edit}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={menuItems}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.menuList}
            />
          </>
        )}

        <Portal>
          <Dialog
            visible={visible}
            onDismiss={hideDialog}
            style={styles.dialog}>
            <Dialog.Content>
              <Text style={styles.Text}>Are you sure you want to logout?</Text>
            </Dialog.Content>
            <Dialog.Actions style={styles.buttons}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={hideDialog}
                disabled={isPending}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.logout]}
                onPress={handleLogout}
                disabled={isPending}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ImageBackground>
    </View>
  );
};

export default AccountScreen;
