import {QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import queryClient from './android/app/src/config/queryClient';
import AppNavigator from './android/app/src/navigation/routes';
import './global.css';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DefaultTheme, PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
    },
  };
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <PaperProvider
          theme={theme}
          settings={{
            icon: props => <Icon {...props} />,
          }}>
          <AppNavigator />
        </PaperProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
