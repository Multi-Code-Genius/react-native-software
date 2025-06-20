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
    throw error;
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
        message: 'OTP Sent to Your Number',
        title: 'OTP Sent!',
        type: 'success',
      });

      _onSuccess?.(data);
    },
    onError: (err: any) => {
      showToast({
        title: err.message || 'Failed to send OTP',
        message: err.message,
        type: 'error',
      });
      _onError?.(err);
    },
  });
};

export const verifyOtp = async (data: {phone: string; otp: string}) => {
  const response = await api('/auth/verify-otp', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });

  return response;
};

export const useVerifyOtp = (
  _onSuccess?: (data: any) => void,
  _onError?: (error: any) => void,
) => {
  const {showToast} = useToast();
  return useMutation({
    mutationFn: (data: {phone: string; otp: string}) => verifyOtp(data),
    onSuccess: () => {
      showToast({
        title: 'OTP verified',
        message: 'OTP verified successfully',
        type: 'success',
      });
    },
    onError: (err: any) => {
      showToast({
        title: 'Wrong OTP!',
        message: 'Incorrect OTP - Please retry',
        type: 'error',
      });
    },
  });
};
