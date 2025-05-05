import {QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import queryClient from './android/app/src/config/queryClient';
import AppNavigator from './android/app/src/navigation/AppNavigator';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>
  );
}
