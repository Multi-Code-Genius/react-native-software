import React, {useCallback} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import AppHeader from '../components/AppHeader';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useGetVenue} from '../api/vanue';
import {FlatList} from 'react-native-gesture-handler';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/routes';
import {useTheme} from '../context/ThemeContext';

const BookingVenuesScreen = () => {
  const {data, refetch, isLoading} = useGetVenue();

  useFocusEffect(
    useCallback(() => {
      if (!isLoading) {
        refetch();
      }
    }, [refetch]),
  );

  const {theme} = useTheme();
  const styles = getStyles(theme);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <Card
        style={[styles.card, styles.shadow]}
        mode="elevated"
        onPress={() => navigation.navigate('BookingSlot', {venueId: item?.id})}>
        <Card.Content style={{flexDirection: 'column', gap: 16, flex: 1}}>
          <Text style={styles.heading}>{`VENUE ${index + 1}`}</Text>
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
    <View style={styles.container}>
      <AppHeader title="Book Venue" isApp />
      <ImageBackground
        source={theme.dark && require('../assets/ScreenShaded.png')}
        style={styles.headerGlow}
        resizeMode="cover">
        <View style={styles.subcontainer}>
          <FlatList
            data={data?.venues}
            renderItem={renderItem}
            keyExtractor={(item: any) =>
              item.id?.toString() ?? Math.random().toString()
            }
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default BookingVenuesScreen;

const getStyles = (theme: any) =>
  StyleSheet.create({
    headerGlow: {
      width: '100%',
      height: '50%',
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    subcontainer: {
      padding: 15,
    },
    card: {
      borderRadius: 0,
      overflow: 'hidden',
      flex: 1,
      margin: 8,
      backgroundColor: theme.colors.card,
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    headContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    name1: {
      fontSize: 16,
      fontFamily: 'Montserrat-SemiBold',
      color: theme.colors.text,
    },
    detail: {
      flexDirection: 'row',
      gap: 5,
    },
    name: {
      fontSize: 16,
      fontFamily: 'Montserrat-Medium',
      color: '#888888',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: 150,
    },
    heading: {
      color: theme.colors.text1,
      fontSize: 12,
      fontFamily: 'Montserrat-SemiBold',
    },
    category: {
      flexDirection: 'row',
      gap: 10,
    },
    type: {
      borderColor: theme.colors.labelBorder1,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderWidth: 1,
      borderRadius: 20,
      color: theme.colors.labelBorder1,
      fontFamily: 'Montserrat-Medium',
      fontSize: 10,
    },
    type1: {
      borderColor: theme.colors.labelBorder2,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderWidth: 1,
      borderRadius: 20,
      color: theme.colors.labelBorder2,
      fontFamily: 'Montserrat-Medium',
      fontSize: 10,
    },
  });
