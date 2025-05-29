import {create} from 'zustand';

export type VenueFormData = {
  name: string;
  description: string;
  address: string;
  category: string;
  hourlyPrice: number;
  location: {
    city: string;
    lat: number;
    lng: number;
  };
  gameInfo: {
    type: string;
    maxPlayers: number;
  };
  grounds: number;
};

type VenueStore = {
  formData: Partial<VenueFormData>;
  updateField: (field: string, value: any) => void;
  resetForm: () => void;
};

export const useVenueStore = create<VenueStore>(set => ({
  formData: {},
  updateField: (field, value) =>
    set((state: any) => {
      if (field === 'city' || field === 'lat' || field === 'lng') {
        return {
          formData: {
            ...state.formData,
            location: {
              ...state.formData.location,
              [field]: value,
            },
          },
        };
      }

      if (field === 'type' || field === 'maxPlayers') {
        return {
          formData: {
            ...state.formData,
            gameInfo: {
              ...state.formData.gameInfo,
              [field]: value,
            },
          },
        };
      }

      return {
        formData: {
          ...state.formData,
          [field]: value,
        },
      };
    }),

  resetForm: () => set({formData: {}}),
}));
