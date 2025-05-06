import {create} from 'zustand';

export type VenueFormData = {
  name: string;
  description: string;
  state: string;
  city: string;
  address: string;
  postalCode: string;
  capacity: number;
  category: string;
  hourlyPrice: number;
  // turfTypes: string[];
  surface: string;
  net: number;
  images: string[];
  location: {
    city: string;
    area: string;
  };
  gameInfo: {
    indoor: string;
    outdoor: string;
    roof: string;
    surface: string;
  };
};

type VenueStore = {
  formData: Partial<VenueFormData>;
  updateField: (field: string, value: any) => void;
  resetForm: () => void;
};
export const addVenueStore = create<VenueStore>(set => ({
  formData: {},
  updateField: (field, value) =>
    set((state: any) => {
      if (field === 'city' || field === 'area') {
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

      if (field === 'gameInfo') {
        return {
          formData: {
            ...state.formData,
            gameInfo: {
              ...state.formData.gameInfo,
              ...value,
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
