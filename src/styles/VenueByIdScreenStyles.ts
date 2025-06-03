import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  data: {
    paddingTop: 10,
    fontSize: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  editRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    textAlign: 'right',
  },
  details: {
    flex: 1,
    padding: 12,
    borderStyle: 'solid',
    width: '40%',
    borderWidth: 1,
    borderRadius: 10,
  },
  details2: {
    width: '60%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  detailsmain: {
    padding: 12,
    borderStyle: 'solid',
    borderRadius: 10,
    width: '30%',
    borderWidth: 1,
    flex: 1,
    gap: 5,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  columnContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
  cardContainer: {
    marginTop: 10,
    flex: 1,
    gap: 10,
    marginBottom: 10,
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
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    marginBottom: 10,
    fontSize: 18,
    backgroundColor: '#e9e9e9eb',
    padding: 10,
    borderRadius: 10,
  },
  description: {
    color: '#000000',
    backgroundColor: '#e9e9e9eb',
    padding: 10,
    fontSize: 18,
  },
});
