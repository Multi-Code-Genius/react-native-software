import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
  },

  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#555',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    alignSelf: 'flex-start',
  },
  venueListContainer: {
    flex: 1,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  welcomeText: {
    color: '#000',
  },
  divider: {
    marginVertical: 16,
  },
  separator: {
    textAlign: 'left',
    color: 'gray',
    marginVertical: 8,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardLeft: {
    marginRight: 12,
    marginTop: 'auto',
    gap: 5,
  },
  cardContent: {
    flex: 1,
    gap: 5,
  },

  cardRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },

  category: {
    fontSize: 14,
    color: '#6b72b4',
    fontWeight: '500',
    marginBottom: 4,
  },

  address: {
    fontSize: 13,
    color: '#3b3939',
    marginBottom: 2,
  },

  price: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2D3748',
    marginTop: 4,
  },

  location: {
    fontSize: 12,
    color: '#838282',
    marginTop: 4,
  },
});
