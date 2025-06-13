import React, {createContext, useState, useEffect, useContext} from 'react';
import {Appearance} from 'react-native';
import {LightTheme, DarkTheme, AppTheme} from '../theme';

const ThemeContext = createContext<{
  theme: AppTheme;
  toggleTheme: () => void;
}>({
  theme: LightTheme,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [theme, setTheme] = useState<AppTheme>(
    Appearance.getColorScheme() === 'dark' ? DarkTheme : LightTheme,
  );

  const toggleTheme = () => {
    setTheme(theme.dark ? LightTheme : DarkTheme);
  };

  useEffect(() => {
    const listener = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme === 'dark' ? DarkTheme : LightTheme);
    });
    return () => listener.remove();
  }, []);

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
