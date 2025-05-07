import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {AccountState} from '../types/auth';

export const useAccountStore = create<AccountState>(set => ({
  accountData: null,

  setAccountData: async data => {
    await AsyncStorage.setItem('userData', JSON.stringify(data));
    set({accountData: data});
  },

  loadAccountData: async () => {
    const storedData = await AsyncStorage.getItem('userData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      set({accountData: parsedData});
    }
  },

  clearAccountData: async () => {
    await AsyncStorage.removeItem('userData');
    set({accountData: null});
  },
}));
