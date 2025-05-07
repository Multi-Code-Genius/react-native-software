import {useMutation, useQuery} from '@tanstack/react-query';
import {api} from '../hooks/api';
import {useAuthStore} from '../store/authStore';
import queryClient from '../config/queryClient';

const accountInfo = async () => {
  try {
    const response = await api('/api/user', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      cache: 'no-store',
    });
    const resp = await response;
    return resp;
  } catch (error) {
    console.error('User Response:', error);
    throw new Error(error instanceof Error ? error.message : 'Data Not Found');
  }
};

export const useAccountInfo = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  return useQuery({
    queryKey: ['account'],
    queryFn: accountInfo,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: 0,
    enabled: isAuthenticated,
  });
};

const updateAccountInfo = async (data: any) => {
  try {
    const response = await api('/api/user/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log('response', response);
    return await response;
  } catch (error) {
    console.error('Update Account Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Update Failed');
  }
};

export const useUpdateAccountInfo = () => {
  return useMutation({
    mutationFn: updateAccountInfo,
    onSuccess: data => {
      queryClient.invalidateQueries({queryKey: ['account']});
      console.log('Account updated:', data);
    },
    onError: error => {
      console.error('Failed to update Account:', error);
    },
  });
};
