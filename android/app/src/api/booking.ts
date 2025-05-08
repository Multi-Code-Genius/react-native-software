import {useMutation, useQuery} from '@tanstack/react-query';
import {api} from '../hooks/api';

const fetchBooking = async (data: any) => {
  try {
    const response = await api(
      `/api/booking/game/${data.gameId}/${data.date}`,
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
