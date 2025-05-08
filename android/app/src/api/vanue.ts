import {useMutation, useQueries, useQuery} from '@tanstack/react-query';
import {api} from '../hooks/api';
import {useVenueStore, VenueFormData} from '../store/useVenueStore';
import queryClient from '../config/queryClient';

export const getVanues = async () => {
  try {
    const response = await api('/api/game/all', {
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

export const useGetVenue = (
  _onSuccess?: (data: any) => void,
  _onError?: (error: any) => void,
) => {
  return useQuery({
    queryKey: ['vanues'],
    queryFn: getVanues,
  });
};

export const addVenue = async (data: Partial<VenueFormData>) => {
  try {
    const response = await api('/api/game/create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      cache: 'no-store',
      body: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    console.error('message Error:', error);
    throw new Error(error instanceof Error ? error.message : 'message failed');
  }
};

export const useAddVenue = (
  _onSuccess?: (data: any) => void,
  onError?: (error: any) => void,
) => {
  return useMutation<any, Error, Partial<VenueFormData>>({
    mutationFn: data => addVenue(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['vanues']});
      useVenueStore.getState().resetForm();
    },
    onError,
  });
};
