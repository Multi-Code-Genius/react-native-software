import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useVenueStore} from '../store/useVenueStore';
import {styles} from '../styles/VenueDetailsStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const VenueGround = () => {
  const updateField = useVenueStore(state => state.updateField);
  const formData = useVenueStore(state => state.formData);
  const [isGround1Open, setIsGround1Open] = useState(false);
  const [isNewGround, setIsNewGround] = useState(false);
  const [value, setValue] = useState(null);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.head}>Venue Size & Price</Text>

      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => setIsGround1Open(prev => !prev)}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#272727',
            padding: 10,
          }}>
          <Text style={styles.head1}>Ground 1</Text>
          <Icon
            name={isGround1Open ? 'arrow-up' : 'arrow-down'}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
        <View>
          {isGround1Open && (
            <View style={{backgroundColor: '#272727'}}>
              <View style={styles.row}>
                <View style={styles.inputBox}>
                  <Icon name="arrow-split-vertical" size={20} color="#fff" />
                  <Text style={styles.inputText}>width</Text>
                </View>
                <View style={styles.inputBox}>
                  <Icon name="arrow-split-horizontal" size={20} color="#fff" />
                  <Text style={styles.inputText}>height</Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.inputBox}>
                  <Icon name="account-group-outline" size={20} color="#fff" />
                  <Text style={styles.inputText}>Max Player</Text>
                </View>
                <View style={styles.inputBox}>
                  <Icon name="currency-rupee" size={20} color="#fff" />
                  <Text style={styles.inputText}>Price</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
      <View style={styles.card}>
        {isNewGround ? (
          <TouchableOpacity
            onPress={() => setIsNewGround(prev => !prev)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#272727',
              padding: 10,
            }}>
            <Text style={styles.head1}>Ground 2</Text>
            <Icon
              name={isGround1Open ? 'arrow-up' : 'arrow-down'}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              borderWidth: 1,
              borderColor: '#837d7d',
              padding: 10,
              width: '50%',
              borderRadius: 20,
            }}>
            <TouchableOpacity onPress={() => setIsNewGround(prev => !prev)}>
              <Text style={{color: '#fff', textAlign: 'center'}}>
                Add Ground 2 +
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {isNewGround && (
          <View style={{backgroundColor: '#272727'}}>
            <View style={styles.row}>
              <View style={styles.inputBox}>
                <Icon name="arrow-split-vertical" size={20} color="#fff" />
                <Text style={styles.inputText}>width</Text>
              </View>
              <View style={styles.inputBox}>
                <Icon name="arrow-split-horizontal" size={20} color="#fff" />
                <Text style={styles.inputText}>height</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.inputBox}>
                <Icon name="account-group-outline" size={20} color="#fff" />
                <Text style={styles.inputText}>Max Player</Text>
              </View>
              <View style={styles.inputBox}>
                <Icon name="currency-rupee" size={20} color="#fff" />
                <Text style={styles.inputText}>Price</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default VenueGround;
