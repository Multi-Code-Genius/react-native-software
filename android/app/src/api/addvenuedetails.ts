import {useMutation} from '@tanstack/react-query';
import {api} from '../hooks/api';
import {VenueFormData} from '../store/addVenueStore';

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
  onSuccess: (data: any) => void,
  onError: (error: any) => void,
) => {
  return useMutation<any, Error, Partial<VenueFormData>>({
    mutationFn: data => addVenue(data),
    onSuccess,
    onError,
  });
};
