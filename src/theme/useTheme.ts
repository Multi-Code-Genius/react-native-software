import {useColorScheme} from 'react-native';
import {DarkTheme, LightTheme} from './color';

export const useTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? DarkTheme : LightTheme;
};
