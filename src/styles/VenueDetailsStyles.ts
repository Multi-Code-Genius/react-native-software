import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
