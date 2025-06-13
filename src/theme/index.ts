import {DarkColors, LightColors, ColorPalette} from './colors';

export type AppTheme = {
  dark: boolean;
  colors: ColorPalette;
};

export const LightTheme: AppTheme = {
  dark: false,
  colors: LightColors,
};

export const DarkTheme: AppTheme = {
  dark: true,
  colors: DarkColors,
};
