import {useQuery} from '@tanstack/react-query';
import {api} from '../hooks/api';

const getDashboardData = async (venueId: string) => {
  try {
    const response = await api(`/api/dashboard/game/${venueId}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      cache: 'no-store',
    });
    const resp = await response;
    console.log('dashboard >>>>>>', resp);
    return resp;
  } catch (error) {
    console.error('Dashboard Data Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Data Not Found');
  }
};

export const useDashboardData = (venueId: string, userId: string) => {
  return useQuery({
    queryKey: ['dashboard', venueId],
    queryFn: () => getDashboardData(venueId),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: 0,
    enabled: !!venueId && !!userId,
  });
};
