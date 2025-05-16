import {useMutation} from '@tanstack/react-query';
import {useToast} from '../context/ToastContext';
import {api} from '../hooks/api';

export const requestOtp = async (email: {number: string}) => {
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
  _onSuccess?: (data: any) => void,
  _onError?: (error: any) => void,
) => {
  const {showToast} = useToast();
  return useMutation({
    mutationFn: (email: {number: string}) => requestOtp(email),
    onSuccess: () => {
      showToast({
        message: 'OTP Sent!',
        showIcon: true,
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

export const verifyOtp = async (data: {number: string; otp: string}) => {
  try {
    console.log('data', data);

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
  _onSuccess?: (data: any) => void,
  _onError?: (error: any) => void,
) => {
  const {showToast} = useToast();
  return useMutation({
    mutationFn: (data: {number: string; otp: string}) => verifyOtp(data),
    onSuccess: () => {
      showToast({
        message: 'OTP verified successfully',
        type: 'success',
        showIcon: true,
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
