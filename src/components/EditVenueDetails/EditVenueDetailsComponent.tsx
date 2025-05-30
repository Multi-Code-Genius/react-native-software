import React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useVenueStore} from '../../store/useVenueStore';

const EditVenueDetailsComponent = () => {
  const {formData, updateField} = useVenueStore();

  const handleChange = (field: string, value: any) => {
    updateField(field, value);
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Text style={styles.label}>City</Text>
        <View style={styles.inputWrapper}>
          <Icon name="google-maps" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter city"
            value={formData?.location?.city || ''}
            onChangeText={text => handleChange('city', text)}
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>lat</Text>
        <View style={styles.inputWrapper}>
          <Icon name="latitude" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter lat"
            value={formData?.location?.lat?.toString() || ''}
            onChangeText={text => handleChange('lat', parseFloat(text) || 0)}
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>lng</Text>
        <View style={styles.inputWrapper}>
          <Icon name="longitude" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter lng"
            value={formData?.location?.lng?.toString() || ''}
            onChangeText={text => handleChange('lng', parseFloat(text) || 0)}
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Game Type</Text>
        <View style={styles.inputWrapper}>
          <Icon name="gamepad" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Game Type"
            value={formData?.gameInfo?.type || ''}
            onChangeText={text => handleChange('type', text)}
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Max Players</Text>
        <View style={styles.inputWrapper}>
          <Icon
            name="hexagon-outline"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter maxPlayers"
            value={formData?.gameInfo?.maxPlayers?.toString() || ''}
            onChangeText={text =>
              handleChange('maxPlayers', text ? parseInt(text, 10) : 0)
            }
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Grounds</Text>
        <View style={styles.inputWrapper}>
          <Icon
            name="hexagon-outline"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter Grounds"
            value={formData?.grounds?.toString() || ''}
            onChangeText={text =>
              handleChange('grounds', text ? parseInt(text, 10) : 0)
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditVenueDetailsComponent;

const styles = StyleSheet.create({
  container: {backgroundColor: '#f7f8fc'},
  content: {padding: 10},
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 0,
  },
  label: {fontSize: 14, fontWeight: '500', marginBottom: 8, color: '#444'},
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fafafa',
  },
  icon: {marginRight: 8},
  input: {flex: 1, height: 40},
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fafafa',
    minHeight: 45,
    zIndex: 1000,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  dropdownText: {fontSize: 16, color: '#333'},
  dropdownPlaceholder: {color: '#999'},
});
