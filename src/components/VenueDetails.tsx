import React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useVenueStore} from '../store/useVenueStore';

const VenueDetails = () => {
  const updateField = useVenueStore(state => state.updateField);
  const formData = useVenueStore(state => state.formData);

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
            onChangeText={text => updateField('city', text)}
            value={formData?.location?.city || ''}
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>lat</Text>
        <View style={styles.inputWrapper}>
          <Icon name="latitude" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter lat"
            onChangeText={text => updateField('lat', text)}
            value={formData?.location?.lat?.toString() || ''}
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>lng</Text>
        <View style={styles.inputWrapper}>
          <Icon name="longitude" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter lng"
            onChangeText={text => updateField('lng', text)}
            value={formData?.location?.lng?.toString() || ''}
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
            onChangeText={text => updateField('type', text)}
            value={formData?.gameInfo?.type || ''}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>maxPlayers</Text>
        <View style={styles.inputWrapper}>
          <Icon
            name="hexagon-outline"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter maxPlayers"
            keyboardType="numeric"
            value={formData.gameInfo?.maxPlayers?.toString() || ''}
            onChangeText={text => updateField('maxPlayers', text)}
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
            placeholder="Enter grounds"
            onChangeText={text => updateField('grounds', parseInt(text))}
            value={formData.grounds?.toString() || ''}
            keyboardType="numeric"
          />
        </View>
      </View>
    </ScrollView>
  );
};
export default VenueDetails;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f8fc',
  },
  content: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 0,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#444',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fafafa',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },
  turfContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  turfChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  turfChipSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginHorizontal: 5,
    fontWeight: '600',
  },
  illustration: {
    height: 120,
    width: '100%',
    resizeMode: 'contain',
    marginBottom: 20,
  },
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

  dropdownText: {
    fontSize: 16,
    color: '#333',
  },

  dropdownPlaceholder: {
    color: '#999',
  },
});
