import {useMutation, useQuery} from '@tanstack/react-query';
import queryClient from '../config/queryClient';
import {useToast} from '../context/ToastContext';
import {api} from '../hooks/api';
import {useVenueStore, VenueFormData} from '../store/useVenueStore';
import {useAuthStore} from '../store/authStore';
import {readFile} from 'react-native-fs';
import {BASE_URL} from '@env';
import {useNavigation} from '@react-navigation/native';

import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/routes';

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
    const response = await api(`/venue/delete/${venueId}`, {
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

const submitVenueData = async (form: Partial<VenueFormData>) => {
  const clonedForm = JSON.parse(JSON.stringify(form));
  delete clonedForm.images;

  const formData = new FormData();
  formData.append('data', JSON.stringify(clonedForm));

  const response = await fetch(`${BASE_URL}/api/v2/venue/create-venue`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to create venue');
  }
  return response.json();
};
export const imageuploading = async (id: number, images: any[]) => {
  const base64Images = await Promise.all(
    images.map(async img => {
      const base64 = await readFile(img.uri, 'base64');
      return `data:${img.mime};base64,${base64}`;
    }),
  );

  const response = await fetch(`${BASE_URL}/api/v2/venue/images/${id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${useAuthStore.getState().token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({images: base64Images}),
  });

  const result = await response.json();
  return result;
};
export const useVenueMutations = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {showToast} = useToast();

  const createVenueMutation = useMutation({
    mutationFn: submitVenueData,
  });

  const uploadImagesMutation = useMutation({
    mutationFn: async ({venueId, images}: {venueId: number; images: any[]}) => {
      return await imageuploading(venueId, images);
    },
    onSuccess: _data => {
      showToast({
        message: 'Venue Created successfully!',
        showIcon: true,
        type: 'success',
      });

      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    },
    onError: (_error: any) => {
      showToast({
        message: 'Image upload failed',
        showIcon: true,
        type: 'error',
      });
    },
  });

  return {createVenueMutation, uploadImagesMutation};
};
