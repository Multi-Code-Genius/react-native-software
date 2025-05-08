import {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useAccountInfo} from '../api/account';
import {useAccountStore} from '../store/accountStore';

export const useAccountLogic = () => {
  const {data, refetch, isLoading} = useAccountInfo();
  const {loadAccountData, setAccountData} = useAccountStore();
  const [refreshing, setRefreshing] = useState(false);

  const account = data?.user || [];

  useEffect(() => {
    setAccountData(data?.user);
    loadAccountData();
  }, [setAccountData, data?.user, loadAccountData]);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (err) {
      Alert.alert('Error', 'Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  return {
    account,
    isLoading,
    refetch,
    refreshing,
    onRefresh,
  };
};
