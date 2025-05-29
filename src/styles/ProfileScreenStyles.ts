import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },
  profileImageWrapper: {
    width: 140,
    height: 140,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#a7a0a0',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  iconOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: '#f9f9f9',
  },
  inputcontainer: {
    width: '100%',
    gap: 10,
    flexDirection: 'row',
  },
  input2: {
    width: '50%',
  },
  button: {
    marginTop: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#222223',
    elevation: 2,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
