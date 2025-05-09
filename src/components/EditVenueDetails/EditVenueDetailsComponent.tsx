import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SegmentedButtons} from 'react-native-paper';
import {VenueFormDetails} from '../../types/venue';

interface Props {
  formData: VenueFormDetails;
  setFormData: React.Dispatch<React.SetStateAction<VenueFormDetails>>;
}
const EditVenueDetailsComponent: React.FC<Props> = ({
  formData,
  setFormData,
}) => {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([
    {label: 'Football', value: 'Football'},
    {label: 'Cricket', value: 'Cricket'},
    {label: 'Basketball', value: 'Basketball'},
  ]);

  const handleChange = (field, val) => {
    setFormData(prev => ({...prev, [field]: val}));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Text style={styles.label}>Capacity</Text>
        <View style={styles.inputWrapper}>
          <Icon
            name="account-group"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter Capacity"
            value={formData.capacity || ''}
            onChangeText={text => handleChange('capacity', text)}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Category</Text>
        <DropDownPicker
          open={open}
          value={formData.category || ''}
          items={items}
          setOpen={setOpen}
          setValue={(val: any) => {
            handleChange('category', val());
          }}
          setItems={setItems}
          placeholder="Select an option"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={styles.dropdownText}
          placeholderStyle={styles.dropdownPlaceholder}
          zIndex={10000}
          listMode="SCROLLVIEW"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Hourly Price</Text>
        <View style={styles.inputWrapper}>
          <Icon
            name="currency-inr"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Hourly Price"
            keyboardType="numeric"
            value={formData.hourlyPrice || ''}
            onChangeText={text => handleChange('hourlyPrice', text)}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Turf Type</Text>
        <SegmentedButtons
          value={formData.turfType || ''}
          onValueChange={selected => {
            handleChange('turfType', selected);

            const gameInfoUpdate = {
              indoor: selected === 'indoor' ? 'true' : 'false',
              outdoor: selected === 'outdoor' ? 'true' : 'false',
              roof: selected === 'roof' ? 'true' : 'false',
            };
            handleChange('gameInfo', {...formData.gameInfo, ...gameInfoUpdate});
          }}
          buttons={[
            {value: 'indoor', label: 'Indoor'},
            {value: 'outdoor', label: 'Outdoor'},
            {value: 'roof', label: 'Roof'},
          ]}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Surface</Text>
        <View style={styles.inputWrapper}>
          <Icon name="texture-box" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Surface"
            value={formData.gameInfo?.surface || ''}
            onChangeText={text =>
              handleChange('gameInfo', {...formData.gameInfo, surface: text})
            }
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Net</Text>
        <View style={styles.inputWrapper}>
          <Icon name="tournament" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Turf Net"
            keyboardType="numeric"
            value={formData.net || ''}
            onChangeText={text => handleChange('net', text)}
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
