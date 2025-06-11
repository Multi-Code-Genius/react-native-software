import {
  useFocusEffect,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import React, {useCallback, useState, useRef, useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Card, Dialog, Divider, Portal, Text} from 'react-native-paper';
import {useGetVenue, useDeleteVenue} from '../api/vanue';
import {SafeAreaView} from 'react-native-safe-area-context';
import WelcomeTab from '../components/WelcomeTab';
import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootStackParamList} from '../navigation/routes';

const VenueScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {data, refetch, isLoading} = useGetVenue();
  const deleteVenue = useDeleteVenue();
  const hasVenues = Array.isArray(data?.venues) && data.venues.length > 0;
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%'], []);
  const [selectedVenue, setSelectedVenue] = useState<any>(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  console.log('data', data);

  const onDismissDialog = () => {
    setDialogVisible(false);
    // setSelectedVenue(null);
  };

  const openMenu = (venue: any) => {
    setSelectedVenue(venue);
    sheetRef.current?.present();
  };

  const onPressDelete = () => {
    sheetRef.current?.close();
    setDialogVisible(true);
  };
  console.log('selectedVenue>>>>>>', selectedVenue);
  const onConfirmDelete = async () => {
    if (!selectedVenue?.id) return;
    try {
      await deleteVenue.mutate(selectedVenue.id);
      onDismissDialog();
      refetch();
    } catch (err) {
      console.error('Delete Error:', err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const renderItem = ({item}: any) => {
    console.log('item', item.images[0]);

    return (
      <Card
        style={[styles.card, styles.shadow]}
        mode="elevated"
        onPress={() =>
          (navigation as any).navigate('bookingData', {
            venueId: item.id,
            price: item.hourlyPrice,
          })
        }>
        <Card.Content style={{flexDirection: 'column', gap: 16, flex: 1}}>
          <View style={styles.headContainer}>
            <Text style={styles.heading}>VENUE</Text>
            <Icon
              name="ellipsis-vertical"
              size={20}
              color={'#888'}
              onPress={() => openMenu(item)}
            />
          </View>
          <Image
            source={{
              uri: `${item.images[0]}`,
            }}
            style={styles.image}
          />
          <Text style={styles.name1}>{item.name}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.name}>
              ₹ {item.ground_details?.[0]?.hourly_price} / Per Hour
            </Text>
            <View style={styles.detail}>
              <Icon name="location" size={20} color={'#888'} />
              <Text style={styles.name}>
                {item?.location?.area}, {item?.location?.city}
              </Text>
            </View>
          </View>
          <View style={styles.category}>
            <Text style={styles.type}>Cricket</Text>
            <Text style={styles.type1}>Football</Text>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.safeArea} edges={[]}>
          <AppHeader />

          <View style={{flex: 1, backgroundColor: '#000'}}>
            <ImageBackground
              source={require('../assets/ScreenShaded.png')}
              style={styles.headerGlow}
              resizeMode="cover">
              <View style={styles.venueListContainer}>
                <View style={styles.header}>
                  <Text variant="headlineLarge" style={styles.headerText}>
                    Your Listed Venue
                  </Text>
                  <TouchableOpacity
                    style={styles.addvenuebutton}
                    onPress={() => navigation.navigate('Addvenue')}>
                    <Text style={styles.text}>Add Venue</Text>
                    <Icon name="add-circle" size={20} color={'#fff'} />
                  </TouchableOpacity>
                </View>

                {isLoading ? (
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
                ) : hasVenues ? (
                  <FlatList
                    data={data?.venues}
                    renderItem={renderItem}
                    keyExtractor={(item: any) =>
                      item.id?.toString() ?? Math.random().toString()
                    }
                    showsVerticalScrollIndicator={false}
                  />
                ) : (
                  <View
                    style={{
                      width: '100%',
                      height: '90%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                      No Venue Found
                    </Text>
                  </View>
                )}
              </View>
            </ImageBackground>
          </View>

          <BottomSheetModal
            ref={sheetRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{backgroundColor: '#0F0F0F', borderRadius: 8}}>
            <BottomSheetView style={{padding: 16}}>
              <TouchableOpacity style={styles.menu} onPress={() => {}}>
                <Icon name="create" size={20} color={'#fff'} />
                <Text style={styles.bottomtext}>Edit Venue</Text>
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity style={styles.menu} onPress={onPressDelete}>
                <Icon name="trash" size={20} color={'#fff'} />
                <Text style={styles.bottomtext}>Delete Venue</Text>
              </TouchableOpacity>
            </BottomSheetView>
          </BottomSheetModal>
          <Portal>
            <Dialog
              visible={dialogVisible}
              onDismiss={onDismissDialog}
              style={styles.dialog}>
              <Dialog.Content>
                <Text style={styles.Text}>
                  {`Are you sure you want to delete Venue ${selectedVenue?.id}?`}
                </Text>
              </Dialog.Content>
              <Dialog.Actions style={styles.buttons}>
                <Button onPress={onDismissDialog} style={styles.cancel}>
                  Cancel
                </Button>
                <Button onPress={onConfirmDelete} style={styles.logout}>
                  Delete
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default VenueScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
    color: '#888888',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: '#000000',
    borderRadius: 0,
  },
  menu: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 19,
  },
  detail: {
    flexDirection: 'row',
    gap: 5,
  },
  name1: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
  },
  category: {
    flexDirection: 'row',
    gap: 10,
  },
  type: {
    borderColor: '#FF9EEC',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 20,
    color: '#FF9EEC',
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'medium',
    fontSize: 10,
  },
  type1: {
    borderColor: '#F9FFB5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 20,
    color: '#F9FFB5',
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'medium',
    fontSize: 10,
  },
  card: {
    borderRadius: 0,
    overflow: 'hidden',
    flex: 1,
    margin: 8,
    backgroundColor: '#272727',
  },
  heading: {
    color: '#B2C000',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Montserrat-Regular',
  },
  image: {
    width: '100%',
    height: 150,
  },
  addvenuebutton: {
    flexDirection: 'row',
    gap: 5,
    backgroundColor: '#191919',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
  },
  bottomtext: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  venueName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  chip: {
    backgroundColor: '#e0f7fa',
    color: '#00796b',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 12,
    marginBottom: 8,
  },
  cardText: {
    flex: 1,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: '600',
  },
  locationText: {
    marginTop: 6,
    fontSize: 13,
    color: 'gray',
    flex: 1,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  Text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Montserrat-Regular',
  },
  buttons: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  cancel: {
    backgroundColor: '#242600',
    width: '50%',
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    padding: 8,
    lineHeight: 22,
    fontFamily: 'Montserrat-Regular',
    borderRadius: 0,
  },
  logout: {
    backgroundColor: '#B2C000',
    width: '50%',
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
    padding: 8,
    lineHeight: 22,
    fontFamily: 'Montserrat-Regular',
    borderRadius: 0,
  },
  headerGlow: {
    width: '100%',
    height: '50%',
    flex: 1,
  },
  headerText: {
    fontSize: 16,
    // fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
  },
  venueListContainer: {
    margin: 10,
    padding: 10,
    marginBottom: 40,
  },
});
