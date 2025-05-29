import {useMutation} from '@tanstack/react-query';
import {useToast} from '../context/ToastContext';
import {api} from '../hooks/api';

export const requestOtp = async (payload: {phone: string; name: string}) => {
  try {
    const response = await api('/auth/send-otp', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: payload,
    });
    return await response;
  } catch (error: any) {
    console.log('login Error', error.message);
    throw error; // rethrow so mutation can catch it
  }
};

export const useRequestOtp = (
  _onSuccess?: (data: any) => void,
  _onError?: (error: any) => void,
) => {
  const {showToast} = useToast();

  return useMutation({
    mutationFn: (payload: {phone: string; name: string}) => requestOtp(payload),
    onSuccess: data => {
      showToast({
        message: 'OTP Sent!',
        showIcon: true,
        type: 'success',
      });
      _onSuccess?.(data);
    },
    onError: (err: any) => {
      showToast({
        message: err.message || 'Failed to send OTP',
        type: 'error',
      });
      _onError?.(err);
    },
  });
};

export const verifyOtp = async (data: {number: string; otp: string}) => {
  try {
    console.log('data', data);

    const response = await api('/auth/verify-otp', {
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
