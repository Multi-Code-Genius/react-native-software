import React, {useState} from 'react';
import {View, FlatList, ImageBackground, TouchableOpacity} from 'react-native';
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
import {styles} from '../styles/AccountScreenStyles';
import {RootStackParamList} from '../navigation/routes';
import AppHeader from '../components/AppHeader';

const AccountScreen = () => {
  const {data, isPending} = useAccountInfo();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [visible, setVisible] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
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
          <Icon name={item.icon} size={20} color="#FFF" />
          <Text style={styles.menuTitle}>{item.title}</Text>
        </View>
        {item.title !== 'Logout' && item.title !== 'BlackTheme' && (
          <Icon name="chevron-forward" size={18} color="#999" />
        )}
        {item.title === 'BlackTheme' && (
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
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
        source={require('../assets/ScreenShaded.png')}
        style={styles.headerGlow}
        resizeMode="cover">
        <View style={styles.header}>
          <Text style={styles.title1}>Hit Wicket Turf & Sports Club</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              justifyContent: 'center',
            }}>
            <Text style={styles.userEmail}>
              {data?.user?.email || 'example@email.com'}
            </Text>
            <Text style={styles.userEmail}>|</Text>
            <Text style={styles.userName}>
              {data?.user?.phoneNumber || '8745874574'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.editProfile}
            onPress={() => {
              console.log('Edit Profile Pressed');
              navigation.navigate('ProfileInfo' as never);
            }}>
            <Icon name={'create'} size={20} color={'#fff'} />
            <Text style={styles.edit}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={menuItems}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.menuList}
        />
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={hideDialog}
            style={styles.dialog}>
            <Dialog.Content>
              <Text style={styles.Text}>Are you sure you want to logout?</Text>
            </Dialog.Content>
            <Dialog.Actions style={styles.buttons}>
              <Button onPress={hideDialog} style={styles.cancel}>
                Cancel
              </Button>
              <Button onPress={handleLogout} style={styles.logout}>
                Logout
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ImageBackground>
    </View>
  );
};

export default AccountScreen;
