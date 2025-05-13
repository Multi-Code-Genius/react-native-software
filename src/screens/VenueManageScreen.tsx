import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Dialog,
  Divider,
  Icon,
  IconButton,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDeleteVenue, useGetVenue} from '../api/vanue';
import {useToast} from '../context/ToastContext';

const VenueManageScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {data, isLoading} = useGetVenue();
  console.log('data,', data);
  const venueById = route.params as {id?: string};
  const {showToast} = useToast();
  const {mutate: deleteVenueMutation, isPending} = useDeleteVenue(() => {
    setShowCancelConfirm(false);
  });

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);
  const theme = useTheme();
  const handleDeleteVenue = () => {
    if (selectedVenueId) {
      deleteVenueMutation(selectedVenueId);
    }
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('VenueByID', {id: item?.id})}>
        <View style={styles.card}>
          {/* <Image source={{uri: item?.images?.[0]}} style={styles.image} /> */}
          <View style={styles.info}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.category}</Text>
            <Text>{item.address}</Text>
            <Text style={{marginTop: 4}}>
              ₹{item.hourlyPrice} /
              <Icon source={'person'} size={10} />
            </Text>
            <Text style={styles.location}>
              {item.location?.area} - {item.location?.city}
            </Text>
          </View>
          <View style={{alignItems: 'flex-start'}}>
            <IconButton
              icon={'trash'}
              size={22}
              iconColor="#f53333"
              onPress={() => {
                setSelectedVenueId(item.id);
                setShowCancelConfirm(true);
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const hasVenues = Array.isArray(data?.games) && data.games.length > 0;

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        {isLoading ? (
          <ActivityIndicator color="#000000" />
        ) : hasVenues ? (
          <View style={styles.venueListContainer}>
            <View style={styles.header}>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('Addvenue')}
                style={styles.button}>
                + Add venue
              </Button>
            </View>
            <FlatList
              data={data.games}
              renderItem={renderItem}
              keyExtractor={(item: any) => item.id?.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <View style={styles.welcomeContainer}>
            <Text variant="headlineLarge" style={styles.welcomeText}>
              Congratulations!
            </Text>
            <Text variant="titleMedium" style={styles.welcomeText}>
              Your account has been created successfully.
            </Text>
            <Divider style={styles.divider} />
            <Text variant="bodyMedium" style={{color: colors.onBackground}}>
              Please complete your profile to add venues, manage all your
              bookings, and access all features.
            </Text>
            <Button
              mode="contained"
              onPress={() => {
                showToast({
                  message: 'Click on continue for Profile -->',
                  type: 'success',
                  actionLabel: 'Continue',
                  onActionPress: () => {
                    navigation.navigate('Account');
                  },
                });
              }}
              style={styles.button}
              labelStyle={{fontWeight: 'bold'}}>
              Complete Profile
            </Button>
            <Text style={styles.separator}>──── or ────</Text>
            <Text
              variant="titleMedium"
              style={[styles.welcomeText, {marginBottom: 8}]}>
              Are you a sports turf owner?
            </Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Addvenue')}
              style={styles.button}
              labelStyle={{fontWeight: 'bold'}}>
              Add venue
            </Button>
          </View>
        )}
      </View>

      {/* Delete Confirmation Dialog */}
      <Portal>
        <Dialog
          style={{backgroundColor: theme.colors.onPrimary}}
          visible={showCancelConfirm}
          onDismiss={() => setShowCancelConfirm(false)}>
          <Dialog.Title>Delete Confirmation</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete this venue?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowCancelConfirm(false)}>No</Button>
            <Button
              loading={isPending}
              onPress={() => {
                setShowCancelConfirm(false);
                handleDeleteVenue();
              }}>
              Yes
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

export default VenueManageScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    marginTop: 4,
    color: 'gray',
    fontSize: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    alignSelf: 'flex-start',
  },
  venueListContainer: {
    flex: 1,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  welcomeText: {
    color: '#000',
  },
  divider: {
    marginVertical: 16,
  },
  separator: {
    textAlign: 'left',
    color: 'gray',
    marginVertical: 8,
  },
});
