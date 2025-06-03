import React from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useVenueStore} from '../store/useVenueStore';
import {styles} from '../styles/VenueDetailsStyles';

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
