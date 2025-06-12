import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  card: {
    flex: 1,
  },
  headerGlow: {
    width: '100%',
    height: '50%',
    flex: 1,
  },
  shadow: {},
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  name1: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
    color: '#888888',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detail: {
    flexDirection: 'row',
    gap: 5,
  },
  tabs: {
    width: '50%',
    alignItems: 'center',
    paddingBottom: 10,
  },
  category: {
    flexDirection: 'row',
    gap: 10,
  },
  type: {
    borderColor: '#FF9EEC',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 20,
    color: '#FF9EEC',
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'medium',
    fontSize: 10,
  },
  type1: {
    borderColor: '#F9FFB5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 20,
    color: '#F9FFB5',
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'medium',
    fontSize: 10,
  },
  venueListContainer: {
    margin: 10,
    padding: 10,
    flex: 1,
    marginBottom: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 10,
    borderBottomColor: '#918f8f',
    borderBottomWidth: 1,
    marginTop: 20,
  },
  tabText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
  },
  tabActive: {
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingBottom: 10,
  },
  tabActiveText: {
    color: '#FFF',
  },
  groundSize: {
    color: '#888',
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'medium',
  },

  booking: {
    backgroundColor: '#323232',
    width: '100%',
    flexDirection: 'row',
  },

  right: {
    width: '70%',
    padding: 20,
    gap: 10,
  },
  available: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    flexDirection: 'row',
    gap: 5,
  },
  username: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
  },
  number: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#888888',
    fontWeight: 'medium',
  },
  icon: {
    backgroundColor: '#191919',
    paddingVertical: 7,
    paddingHorizontal: 22,
    width: '50%',
    alignItems: 'center',
  },
  left: {
    width: '30%',
    backgroundColor: '#864A4B',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  time: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    marginVertical: 4,
  },

  divider: {
    width: 1,
    height: 80,
    backgroundColor: '#fff',
    marginVertical: 2,
  },
});
