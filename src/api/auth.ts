import {useMutation} from '@tanstack/react-query';
import {api} from '../hooks/api';
import Toast from 'react-native-toast-message';

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
  _onSuccess?: (data: any) => void,
  _onError?: (error: any) => void,
) => {
  return useMutation({
    mutationFn: (email: {email: string}) => requestOtp(email),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'OTP sent to email',
        text2: 'Please check Email spam Folder',
      });
    },
    onError: (err: any) => {
      Toast.show({
        type: 'error',
        text1: err.message,
        text2: 'Something Went Wrong',
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
  _onSuccess?: (data: any) => void,
  _onError?: (error: any) => void,
) => {
  return useMutation({
    mutationFn: (data: {email: string; otp: string}) => verifyOtp(data),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'OTP verified successfully',
        // text2: 'Something Went Wrong',
      });
    },
    onError: (err: any) => {
      Toast.show({
        type: 'error',
        text1: err.message,
        text2: 'Something Went Wrong',
      });
    },
  });
};
