import {useMutation, useQuery} from '@tanstack/react-query';
import queryClient from '../config/queryClient';
import {useToast} from '../context/ToastContext';
import {api} from '../hooks/api';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/routes';
import {useBookingFormStore} from '../store/useBookingFormStore';

const fetchBooking = async (data: any) => {
  try {
    const response = await api(
      `/booking/booking-date/${data.date}/${data.gameId}/`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        cache: 'no-store',
      },
    );
    const resp = await response;
    return resp;
  } catch (error) {
    console.error('Booking Response:', error);
    throw new Error(error instanceof Error ? error.message : 'Data Not Found');
  }
};

export const useBookingInfo = (data: any) => {
  return useQuery({
    queryKey: ['booking', data.date, data.gameId],
    queryFn: () => fetchBooking(data),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};

export const useBookingMutation = (
  onSuccess?: () => void,
  onError?: () => void,
) => {
  return useMutation({
    mutationFn: (data: any) => fetchBooking(data),
    onSuccess,
    onError,
  });
};

const createBooking = async (data: any) => {
  try {
    const response = await api('/booking/create-booking', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      cache: 'no-store',
      body: JSON.stringify(data),
    });
    const resp = await response;

    return resp;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Data Not Found');
  }
};

export const useCreateBooking = (
  _onSuccess?: () => void,
  _onError?: () => void,
) => {
  const {showToast} = useToast();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return useMutation({
    mutationFn: (data: any) => createBooking(data),
    onSuccess: () => {
      // showToast({
      //   message: 'Booking Done!',
      //   type: 'success',
      // });
      navigation.navigate('BookingSuccess');
      useBookingFormStore.getState().resetForm();
    },
    onError: (err: any) => {
      showToast({
        message: err.message,
        type: 'error',
      });
    },
  });
};

const cancelBooking = async (id: string) => {
  try {
    const response = await api(`/booking/cancel/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      cache: 'no-store',
    });
    const resp = await response;
    return resp;
  } catch (error) {
    console.log('Bokking Response', error);
    throw new Error(error instanceof Error ? error.message : 'Data Not Found');
  }
};

export const useCancelBooking = (
  _onSuccess?: () => void,
  _onError?: () => void,
) => {
  const {showToast} = useToast();

  return useMutation({
    mutationFn: (id: string) => cancelBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['booking']});
      showToast({
        message: 'Cancel Booking!',
        type: 'success',
      });
    },
    onError: (err: any) => {
      showToast({
        message: err.message,
        type: 'error',
      });
    },
  });
};

const updateBooking = async (data: any) => {
  try {
    const response = await api(`/booking/update-booking/${data.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data.data),
      cache: 'no-store',
    });
    const resp = await response;
    return resp;
  } catch (error) {
    console.log('Booking Response', error);
    throw new Error(error instanceof Error ? error.message : 'Data Not Found');
  }
};

export const useUpdateBooking = (
  onSuccess?: () => void,
  _onError?: () => void,
) => {
  const {showToast} = useToast();
  return useMutation({
    mutationFn: ({id, data}: {id: string; data: any}) =>
      updateBooking({id, data}),
    onSuccess: () => {
      showToast({
        message: 'Booking Updated!',
        type: 'success',
      });
      queryClient.invalidateQueries({queryKey: ['booking']});
      onSuccess?.();
    },
    onError: (err: any) => {
      showToast({
        message: err.message,
        type: 'error',
      });
    },
  });
};

export const updateBookingStatus = async (id: string, status: string) => {
  try {
    const response = await api(`/booking/paymentUpdate/${id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({status}),
      cache: 'no-store',
    });
    const resp = await response;
    return resp;
  } catch (error) {
    console.log('Booking response', error);
    throw new Error(error instanceof Error ? error.message : 'Data Not Found');
  }
};

export const useUpdateBokkingStatus = (
  onSuccess?: () => void,
  onError?: () => void,
) => {
  return useMutation({
    mutationFn: ({id, status}: {id: string; status: string}) =>
      updateBookingStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['booking']});
      onSuccess?.();
    },
    onError,
  });
};

const bookingById = async (id: string) => {
  try {
    const response = await api(`/booking/booking-id/${id}`, {
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

export const useBookingById = (id: string) => {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => bookingById(id),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: 0,
    enabled: !!id,
  });
};

const suggestedCustomer = async (number: string) => {
  const response = await api(`/api/booking/suggest-customer/${number}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    cache: 'no-store',
  });

  return response;
};

export const useSuggestedCustomer = (number: string) => {
  return useQuery({
    queryKey: ['customerNumber', number],
    queryFn: () => suggestedCustomer(number),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: 0,
    enabled: !!number,
  });
};

const getBookingByFilter = async (payload: any) => {
  const response = await api(
    `/booking/filter/${payload.venueId}/${payload.ground}/${payload.date}`,
    {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      cache: 'no-store',
    },
  );
  console.log('response>>>', response);
  return response;
};

export const useBookingFilter = (payload: any) => {
  return useQuery({
    queryKey: ['booking-filter', payload.venueId, payload.ground, payload.date],
    queryFn: () => getBookingByFilter(payload),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: 0,
    enabled: !!payload.venueId,
  });
};
