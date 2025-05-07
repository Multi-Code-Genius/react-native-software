import React from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './android/app/src/config/queryClient';
import AppNavigator from './android/app/src/navigation/routes';
import './global.css';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {MD3DarkTheme, PaperProvider} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function App() {
  const theme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: '#000000',
      onPrimary: '#FFFFFF',
      background: '#FFFFFF',
      onBackground: '#000000',
      surface: '#FFFFFF',
      onSurface: '#000000',
      secondary: '#000000',
      onSecondary: '#FFFFFF',
      error: '#B00020',
      onError: '#FFFFFF',
      surfaceVariant: '#F5F5F5',
      onSurfaceVariant: '#000000',
      outline: '#000000',
      shadow: '#000000',
      elevation: {
        level0: 'transparent',
        level1: '#F0F0F0',
        level2: '#E0E0E0',
        level3: '#D0D0D0',
        level4: '#C0C0C0',
        level5: '#B0B0B0',
      },
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <PaperProvider
          theme={theme}
          settings={{
            icon: props => <Ionicons {...props} />,
          }}>
          <SafeAreaView style={{flex: 1}} edges={['top', 'bottom']}>
            <AppNavigator />
          </SafeAreaView>
        </PaperProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
