import {useQuery} from '@tanstack/react-query';
import {api} from '../hooks/api';

const getDashboardData = async (month: string) => {
  try {
    const response = await api(`/dashboard/native/dashboard/${month}`, {
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

export const useDashboardData = (month: string, userId: string) => {
  return useQuery({
    queryKey: ['dashboard', month],
    queryFn: () => getDashboardData(month),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: 0,
    // enabled: !!month && !!userId,
  });
};
