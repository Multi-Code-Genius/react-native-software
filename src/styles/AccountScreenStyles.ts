import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dialog: {
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '90%',
    margin: 'auto',
  },
  profileContainer: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  menuList: {
    padding: 16,
  },
  menuItem: {
    backgroundColor: '#f9f9f9',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  profileImageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 80,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'relative',
  },
  iconOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0c0c0c',
    borderRadius: 10,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 80,
    backgroundColor: 'white',
  },
});
