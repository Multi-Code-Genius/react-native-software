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
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Card, Dialog, Divider, Portal, Text} from 'react-native-paper';
import {useGetVenue, useDeleteVenue} from '../api/vanue';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootStackParamList} from '../navigation/routes';
import {useTheme} from '../context/ThemeContext';
import {getStyles} from '../styles/VenueScreenStyles';

const VenueScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const {data, refetch, isLoading} = useGetVenue();
  const deleteVenue = useDeleteVenue();
  const hasVenues = Array.isArray(data?.venues) && data.venues.length > 0;
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%'], []);
  const [selectedVenue, setSelectedVenue] = useState<any>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const isDark = theme.dark;
  const onDismissDialog = () => {
    setDialogVisible(false);
  };

  const openMenu = (venue: any) => {
    setSelectedVenue(venue);
    sheetRef.current?.expand();
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
    return (
      <Card
        style={[styles.card]}
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
              uri: `${item?.images?.[0]}`,
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

          <View style={{flex: 1, backgroundColor: theme.colors.background}}>
            <ImageBackground
              source={theme.dark && require('../assets/ScreenShaded.png')}
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
                    <Icon
                      name="add-circle"
                      size={20}
                      color={isDark ? '#FFF' : '#000'}
                    />
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

          <Portal>
            <BottomSheet
              ref={sheetRef}
              index={0}
              snapPoints={snapPoints}
              enablePanDownToClose
              enableDynamicSizing
              backgroundStyle={{
                backgroundColor: theme.colors.background,
                borderRadius: 8,
              }}
              backdropComponent={props => (
                <BottomSheetBackdrop
                  {...props}
                  disappearsOnIndex={-1}
                  appearsOnIndex={0}
                  pressBehavior="close"
                />
              )}>
              <BottomSheetView style={styles.bottomSheetContent}>
                <TouchableOpacity style={styles.menu} onPress={() => {}}>
                  <Icon
                    name="create"
                    size={20}
                    color={isDark ? '#FFF' : '#000'}
                  />
                  <Text style={styles.bottomtext}>Edit Venue</Text>
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity style={styles.menu} onPress={onPressDelete}>
                  <Icon
                    name="trash"
                    size={20}
                    color={isDark ? '#FFF' : '#000'}
                  />
                  <Text style={styles.bottomtext}>Delete Venue</Text>
                </TouchableOpacity>
              </BottomSheetView>
            </BottomSheet>
          </Portal>
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
