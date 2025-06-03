import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
    borderStyle: 'dotted',
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    elevation: 2,
  },
  removeButtonText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  addButton: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  plusIcon: {
    fontSize: 24,
    color: 'gray',
  },
});
