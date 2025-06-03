import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  performanceCard: {
    borderRadius: 16,
    backgroundColor: '#fff',
    elevation: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 16,
  },
  book: {
    width: '100%',
    backgroundColor: '#4caf50',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    padding: 10,
    color: '#333',
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  analyticsBox: {
    width: '47%',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 1},
  },
  iconWrap: {
    backgroundColor: '#4caf50',
    borderRadius: 20,
    padding: 6,
    marginBottom: 8,
  },
  analyticsValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  analyticsLabel: {
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
    marginTop: 4,
  },
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 18,
  },
  heading: {
    marginBottom: 16,
    fontSize: 22,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 30,
  },
  headcontainer: {
    gap: 15,
  },
  buttoncontainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  Heading1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 15,
  },
  button: {
    width: '40%',
    height: 40,
  },
  add: {
    width: '20%',
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#ddd',
    borderRadius: 20,
    marginRight: 8,
  },
  tabButtonActive: {
    backgroundColor: '#4CAF50',
  },
  tabButtonText: {
    color: '#000',
    fontWeight: '500',
  },
  tabButtonTextActive: {
    color: '#fff',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    padding: 10,
    fontWeight: '700',
    color: '#333',
  },
  chartCard: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    elevation: 4,
  },
  barContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    elevation: 4,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  legendContainer: {
    marginTop: 16,
    flexDirection: 'column',
    alignContent: 'center',
    paddingHorizontal: 30,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendLabel: {
    fontSize: 14,
    color: '#555',
  },
});
