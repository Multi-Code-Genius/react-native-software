import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
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
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {data, isLoading} = useGetVenue();
  console.log('data,', data);

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
          <View style={{flex: 1}}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>

            <View style={styles.infoRow}>
              <Icon source="location" size={16} color="#d85a5a" />
              <Text style={styles.infoText}>{item.address}</Text>
            </View>

            <View style={styles.infoRow}>
              <Icon source="cash" size={16} color="#4CAF50" />
              <Text style={styles.infoText}>₹{item.hourlyPrice} / person</Text>
            </View>

            <View style={styles.infoRow}>
              <Icon source="map" size={16} color="#607D8B" />
              <Text style={styles.infoText}>
                {item.location?.area} - {item.location?.city}
              </Text>
            </View>
          </View>

          <IconButton
            icon="trash"
            iconColor="#fd6b6b"
            size={24}
            onPress={() => {
              setSelectedVenueId(item.id);
              setShowCancelConfirm(true);
            }}
          />
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

  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#555',
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
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardLeft: {
    marginRight: 12,
    marginTop: 'auto',
    gap: 5,
  },
  cardContent: {
    flex: 1,
    gap: 5,
  },

  cardRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },

  category: {
    fontSize: 14,
    color: '#6b72b4',
    fontWeight: '500',
    marginBottom: 4,
  },

  address: {
    fontSize: 13,
    color: '#3b3939',
    marginBottom: 2,
  },

  price: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2D3748',
    marginTop: 4,
  },

  location: {
    fontSize: 12,
    color: '#838282',
    marginTop: 4,
  },
});
