import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Divider, IconButton, Text } from 'react-native-paper';
import { useGetVenueById } from '../api/vanue';

export const VenueByIdDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const venueById = route.params as { id?: string };
  const { data } = useGetVenueById(venueById?.id);
  console.log('dataVenueId====>>>>>>', data);

  const game = data?.game;

  if (!game) {
    return <Text>No venue data found.</Text>;
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.editRow}>
          <View style={{ flex: 1 }} />
          <Button
            mode="contained"
            onPress={() => navigation.navigate('EditVenueDetails', { id: venueById })}
            style={styles.editButton}
            labelStyle={{ fontSize: 12 }}
          >
            Edit
          </Button>

        </View>
        <Divider className='mb-2' />
        {game.images?.[0] && (
          <Image source={{ uri: game.images[0] }} style={styles.image} />
        )}
      </View>
      <View style={styles.card}>
        <View className='mt-3'>

          <Text variant="titleLarge" style={styles.title}> Turf Name:  {game.name}</Text>
          <Text style={styles.category}>{game.category}</Text>
          <Text style={styles.text}>📍 Address:  {game.address}</Text>
          <Text style={styles.text}>🏙️ Location:  {game.location.area}, {game.location.city}</Text>
          <Text style={styles.text}>👥 Capacity:  {game.capacity}</Text>
          <Text style={styles.text}>💰 Price/hr:  ₹{game.hourlyPrice}</Text>
          <Text style={styles.text}>🏠 Indoor:  {game.gameInfo?.indoor}</Text>
          <Text style={styles.text}>☁️ Outdoor:  {game.gameInfo?.outdoor}</Text>
          <Text style={styles.text}>🏗️ Roof:  {game.gameInfo?.roof}</Text>
          <Text style={styles.text}>🎾 Surface:  {game.gameInfo?.surface}</Text>
          <Text style={styles.description}>📝  {game.description}</Text>
        </View>
      </View>
    </ScrollView >

  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  iconContainer: {
    borderColor: '#000',
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
    borderStyle: 'dotted',
    marginBottom: 16,
  },

  editRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 8,
  },

  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: '#fff',
    textAlign: 'right'
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 18,
  },
  category: {
    backgroundColor: '#e0f7fa',
    color: '#00796b',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 15,
    marginBottom: 10,
  },
  text: {
    marginBottom: 10,
    fontSize: 18,
    backgroundColor: '#e9e9e9eb',
    padding: 10,
    borderRadius: 10
  },
  description: {
    color: '#000000',
    backgroundColor: '#e9e9e9eb',
    padding: 10,
    fontSize: 18,
  },
});