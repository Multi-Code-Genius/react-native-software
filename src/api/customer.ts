import {useQuery} from '@tanstack/react-query';
import {api} from '../hooks/api';

export const getCustomerDetails = async () => {
  try {
    const response = api('/api/booking/user-booking', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      cache: 'no-store',
    });
    return response;
  } catch (error) {
    console.error('message Error:', error);
    throw new Error(error instanceof Error ? error.message : 'message failed');
  }
};

export const useGetCustomer = (
  _onSuccess?: (data: any) => void,
  _onError?: (error: any) => void,
) => {
  return useQuery({
    queryKey: ['customer'],

    queryFn: getCustomerDetails,
  });
};
