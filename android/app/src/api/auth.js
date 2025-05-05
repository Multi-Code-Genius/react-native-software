import {useMutation} from '@tanstack/react-query';
import {api} from '../hooks/api';

export const userLogin = async data => {
  try {
    const response = await api('/api/auth/send-otp', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });
    const resp = await response;
    return resp;
  } catch (error) {
    console.log('login Errror', error.message);
  }
};

export const useUserLogin = (onSuccess, onError) => {
  return useMutation({
    mutationFn: userLogin,
    onSuccess,
    onError,
  });
};

export const verifyOtp = async data => {
  try {
    const response = await api('/api/auth/verify-otp', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });
    const resp = await response;
    return resp;
  } catch (error) {
    console.log('login Errror', error.message);
  }
};

export const useVerifyOtp = (onSuccess, onError) => {
  return useMutation({
    mutationFn: data => verifyOtp(data),
    onSuccess,
    onError,
  });
};
