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

export const customerById = async (customerId: string) => {
  try {
    const response = await api(`/api/booking/customer/${customerId}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      cache: 'no-store',
    });
    const resp = await response;
    return resp;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Data Not Found');
  }
};

export const useCustomerById = (id: string) => {
  return useQuery({
    queryKey: ['customerId', id],
    queryFn: () => customerById(id),
  });
};
