import {useMutation} from '@tanstack/react-query';
import {api} from '../hooks/api';

const registerNewGame = async (data: any) => {
  try {
    const response = await api('/api/game/create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });

    const resp = await response;
    return resp;
  } catch (error: any) {
    console.log('Game Error', error.message);
  }
};

export const useAddGame = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void,
) => {
  return useMutation({
    mutationFn: (data: any) => registerNewGame(data),
    onSuccess,
    onError,
  });
};
