import {create} from 'zustand';

export const useThemeStore = create(set => ({
  theme: 'light',
  toggleTheme: () =>
    set((state: {theme: string}) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
  setTheme: (theme: any) => set({theme}),
}));
