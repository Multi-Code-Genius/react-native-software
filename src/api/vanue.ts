import {useMutation, useQuery} from '@tanstack/react-query';
import queryClient from '../config/queryClient';
import {useToast} from '../context/ToastContext';
import {api} from '../hooks/api';
import {useVenueStore, VenueFormData} from '../store/useVenueStore';

export const getVanues = async () => {
  try {
    const response = await api('/venue/my-venues', {
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
export const venueById = async (id: any) => {
  try {
    const response = await api(`/venue/venue/${id}`, {
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

export const useGetVenueById = (id: any) => {
  return useQuery({
    queryKey: ['venueId', id],
    queryFn: () => venueById(id),
  });
};

export const editVenueDetails = async (
  data: Partial<VenueFormData>,
  gameId: any,
) => {
  try {
    const response = await api(`/venue/update/${gameId}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      cache: 'no-store',
      body: JSON.stringify(data),
    });

    console.log('response', response);

    return response;
  } catch (error) {
    console.error('message Error:', error);
    throw new Error(error instanceof Error ? error.message : 'message failed');
  }
};

export const useEditVenueDetails = (
  _onSuccess?: (data: any) => void,
  onError?: (error: any) => void,
) => {
  const {showToast} = useToast();

  return useMutation({
    mutationFn: ({
      data,
      gameId,
    }: {
      data: Partial<VenueFormData>;
      gameId: string;
    }) => editVenueDetails(data, gameId),

    onSuccess: data => {
      console.log('Venue updated:', data);
      queryClient.invalidateQueries({queryKey: ['vanues']});
      queryClient.invalidateQueries({queryKey: ['venueId']});
      _onSuccess?.(data);
      showToast({
        message: 'Updated Venue successfully!',
        type: 'success',
        actionLabel: 'Continue',
      });
    },
    onError: error => {
      console.error('Failed to update venue:', error);
      onError?.(error);
      showToast({
        message: error.message,
        type: 'error',
      });
    },
  });
};

export const addVenue = async (data: Partial<VenueFormData>) => {
  try {
    const response = await api('/venue/create-venue', {
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

export const deleteVenueDetails = async (venueId: any) => {
  try {
    const response = await api(`/api/game/delete-venue/${venueId}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      cache: 'no-store',
    });
    const resp = await response;
    return resp;
  } catch (error) {
    console.log('Something is not working', error);
    throw new Error(error instanceof Error ? error.message : 'Data Not Found');
  }
};

export const useDeleteVenue = (
  _onSuccess?: () => void,
  onError?: () => void,
) => {
  return useMutation({
    mutationFn: (id: string) => deleteVenueDetails(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['vanues']});
    },
    onError,
  });
};
