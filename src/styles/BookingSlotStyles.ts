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
  venueListContainer: {
    margin: 10,
    padding: 10,
    marginBottom: 40,
  },
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
  slotContainer: {
    backgroundColor: '#272727',
    padding: 15,
    gap: 30,
  },
  label: {
    fontSize: 12,
    fontWeight: 'semibold',
    marginBottom: 12,
    color: '#B8B8B8',
  },
  inputWrapper2: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#333',
  },
  input2: {
    fontSize: 16,
    color: '#888888',
    marginLeft: 8,
  },
  icon: {
    marginRight: 8,
  },
  button: {
    backgroundColor: '#B2C000',
    borderRadius: 0,
    paddingVertical: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#000',
  },
  buttonContainer: {
    backgroundColor: '#B2C000',
    borderRadius: 0,
    paddingVertical: 10,
    marginVertical: 10,
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  block: {
    flex: 1,
  },
  centerBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  timeBox: {
    backgroundColor: '#191919',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  timeText: {
    color: '#888888',
    fontSize: 16,
  },
  duration: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  timeSlot: {
    width: '30%',
    marginVertical: 6,
    padding: 12,
    backgroundColor: '#323232',
    alignItems: 'center',
    borderRadius: 6,
  },
  selectedSlot: {
    backgroundColor: '#fff',
  },
  slotText: {
    color: '#ccc',
  },
  selectedSlotText: {
    color: '#000',
    fontWeight: 'bold',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    backgroundColor: '#191919',
    paddingVertical: 15,
    marginTop: 10,
  },
  booked: {
    color: '#864A4B',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  selected: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  glowBorder: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 2,
    alignSelf: 'center',
    zIndex: 2,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: '#864A4B',
    borderRadius: 15,
  },
  dot1: {
    width: 10,
    height: 10,
    backgroundColor: '#fffefe',
    borderRadius: 15,
  },
  bottomSheetContent: {
    padding: 16,
  },
});
