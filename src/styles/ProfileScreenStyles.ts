import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 16,
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
    gap: 30,
  },
  label: {
    color: '#B8B8B8',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#323232',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#272727',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'medium',
    fontFamily: 'Montserrat-Regular',
  },

  buttonBottom: {
    backgroundColor: '#B2C000',
    paddingVertical: 16,

    paddingHorizontal: 40,
    width: '100%',
  },
  button2: {
    backgroundColor: '#242600',
    paddingVertical: 16,
    paddingHorizontal: 40,
    width: '100%',
  },

  buttonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonText2: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  buttoncontainer: {
    marginTop: 20,
    position: 'absolute',
    bottom: 10,
    width: '100%',
    gap: 10,
  },
});
