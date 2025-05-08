import {useMutation} from '@tanstack/react-query';
import {api} from '../hooks/api';

export const requestOtp = async (email: {email: string}) => {
  try {
    const response = await api('/api/auth/send-otp', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(email),
    });
    const resp = await response;
    return resp;
  } catch (error: any) {
    console.log('login Error', error.message);
  }
};

export const useRequestOtp = (
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void,
) => {
  return useMutation({
    mutationFn: (email: {email: string}) => requestOtp(email),
    onSuccess,
    onError,
  });
};

export const reSendOtp = async (email: {email: string}) => {
  try {
    const response = await api('/api/auth/resend-otp', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(email),
    });
    const resp = await response;
    return resp;
  } catch (error: any) {
    console.log('login Error', error.message);
  }
};

export const useReSendOtp = (
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void,
) => {
  return useMutation({
    mutationFn: (email: {email: string}) => reSendOtp(email),
    onSuccess,
    onError,
  });
};

export const verifyOtp = async (data: {email: string; otp: string}) => {
  try {
    const response = await api('/api/auth/verify-otp', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });
    const resp = await response;
    return resp;
  } catch (error: any) {
    console.log('login Errror', error.message);
  }
};

export const useVerifyOtp = (
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void,
) => {
  return useMutation({
    mutationFn: (data: {email: string; otp: string}) => verifyOtp(data),
    onSuccess,
    onError,
  });
};
