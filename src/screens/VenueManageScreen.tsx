import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Dialog,
  Icon,
  IconButton,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDeleteVenue, useGetVenue} from '../api/vanue';
import WelcomeTab from '../components/WelcomeTab';
import {RootStackParamList} from '../navigation/routes';
import {styles} from '../styles/VenueManageScreenStyles';

const VenueManageScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {colors} = useTheme();
  const {data, isLoading} = useGetVenue();
  console.log('data,', data);

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
              <Text style={styles.infoText}>₹{item.hourly_price} / person</Text>
            </View>

            <View style={styles.infoRow}>
              <Icon source="map" size={16} color="#607D8B" />
              <Text style={styles.infoText}>{item.location?.city}</Text>
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

  const hasVenues = Array.isArray(data?.venues) && data.venues.length > 0;

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
              data={data.venues}
              renderItem={renderItem}
              keyExtractor={(item: any) => item.id?.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <WelcomeTab />
        )}
      </View>

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
