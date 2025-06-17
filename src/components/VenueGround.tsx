import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {getStyles} from '../styles/VenueDetailsStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useVenueStore} from '../store/useVenueStore';
import {useTheme} from '../context/ThemeContext';

const VenueGround = () => {
  const {formData, updateGroundField, addGround} = useVenueStore();
  const grounds = formData.ground_details || [];
  const {theme} = useTheme();
  const styles = getStyles(theme);
  console.log('formdata>>>', formData);
  const [expandedIds, setExpandedIds] = React.useState<number[]>([1]);

  const toggleExpand = (id: number) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id],
    );
  };

  const handleChange = (
    index: number,
    field: 'width' | 'height' | 'capacity' | 'hourly_price',
    value: string,
  ) => {
    const numericValue = parseFloat(value) || 0;
    updateGroundField(index, field, numericValue);
  };

  const isGroundFilled = (ground: any) => {
    return (
      ground.width > 0 &&
      ground.height > 0 &&
      ground.capacity > 0 &&
      ground.hourly_price > 0
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.head}>Venue Size & Price</Text>

      {grounds.map((ground, index) => (
        <View key={ground.ground} style={styles.card}>
          <TouchableOpacity
            onPress={() => toggleExpand(ground.ground)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: theme.colors.card,
              padding: 10,
            }}>
            <Text style={styles.head1}>Ground {ground.ground}</Text>
            <Icon
              name={
                expandedIds.includes(ground.ground) ? 'arrow-up' : 'arrow-down'
              }
              size={24}
              color={theme.colors.text}
            />
          </TouchableOpacity>

          {expandedIds.includes(ground.ground) && (
            <View style={{backgroundColor: theme.colors.card}}>
              <View style={styles.row}>
                <View style={styles.input}>
                  <Text>Width of feet</Text>
                  <View style={styles.inputBox}>
                    <Icon name="arrow-split-vertical" size={20} color="#fff" />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Width"
                      placeholderTextColor="#717171"
                      keyboardType="numeric"
                      value={ground.width?.toString() || ''}
                      onChangeText={text => handleChange(index, 'width', text)}
                    />
                  </View>
                </View>
                <View style={styles.input}>
                  <Text>height of feet</Text>
                  <View style={styles.inputBox}>
                    <Icon
                      name="arrow-split-horizontal"
                      size={20}
                      color="#fff"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Height"
                      placeholderTextColor="#717171"
                      keyboardType="numeric"
                      value={ground.height?.toString() || ''}
                      onChangeText={text => handleChange(index, 'height', text)}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.input}>
                  <Text>Player Capacity</Text>
                  <View style={styles.inputBox}>
                    <Icon name="account-group-outline" size={20} color="#fff" />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Capacity"
                      placeholderTextColor="#717171"
                      keyboardType="numeric"
                      value={ground.capacity?.toString() || ''}
                      onChangeText={text =>
                        handleChange(index, 'capacity', text)
                      }
                    />
                  </View>
                </View>
                <View style={styles.input}>
                  <Text>Hourly Price</Text>
                  <View style={styles.inputBox}>
                    <Icon name="currency-rupee" size={20} color="#fff" />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Price"
                      placeholderTextColor="#717171"
                      keyboardType="numeric"
                      value={ground.hourly_price?.toString() || ''}
                      onChangeText={text =>
                        handleChange(index, 'hourly_price', text)
                      }
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      ))}

      {isGroundFilled(grounds[grounds.length - 1]) && (
        <View
          style={{
            borderWidth: 1,
            borderColor: '#837d7d',
            padding: 10,
            width: '50%',
            borderRadius: 20,
            marginTop: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              const newGroundId =
                (grounds[grounds.length - 1]?.ground || 0) + 1;
              addGround();
              setExpandedIds(prev => [...prev, newGroundId]);
            }}>
            <Text style={{color: '#fff', textAlign: 'center'}}>
              Add Ground {grounds.length + 1} +
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default VenueGround;
