import {useMutation, useQuery} from '@tanstack/react-query';
import queryClient from '../config/queryClient';
import {api} from '../hooks/api';
import {createGame} from '../services/gameService';
import {useToast} from '../context/ToastContext';
import {useNavigation} from '@react-navigation/native';
import {VenueFormDetails} from '../types/venue';
import {useAuthStore} from '../store/authStore';
import {BASE_URL} from '@env';

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
export const venueById = async (id: any) => {
  try {
    const response = await api(`/api/game/id/${id}`, {
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
  data: Partial<VenueFormDetails>,
  gameId: any,
) => {
  try {
    const response = await api(`/api/game/update-venue/${gameId}`, {
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
      data: Partial<VenueFormDetails>;
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
        // onActionPress: () => {
        //   navigation.navigate('Account');
        // },
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

export const useCreateGame = (
  _onSuccess?: (data: any) => void,
  _onError?: (error: Error) => void,
) => {
  const {showToast} = useToast();
  const navigation = useNavigation();
  return useMutation({
    mutationFn: createGame,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['vanues']});
      showToast({
        message: 'Venue created successfully!',
        type: 'success',
        actionLabel: 'Continue',
        // onActionPress: () => {
        //   navigation.navigate('Bookings');
        // },
      });
    },
    onError: error => {
      showToast({
        message: error.message,
        type: 'error',
      });
    },
  });
};

const vanueImageuploading = async (id: string, payload: any) => {
  console.log('payload', payload);

  const response = await fetch(`${BASE_URL}/api/game/add-images/${id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    },
    body: payload,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload failed: ${errorText}`);
  }

  return await response.json();
};

export const useVanueImageUploading = (
  onSuccess?: (response: any) => void,
  onError?: (error: any) => void,
) => {
  return useMutation({
    mutationFn: ({id, payload}: {id: string; payload: FormData}) =>
      vanueImageuploading(id, payload),

    onSuccess: data => {
      queryClient.invalidateQueries({queryKey: ['vanues']});

      if (onSuccess) {
        onSuccess(data);
      }
    },

    onError,
  });
};
