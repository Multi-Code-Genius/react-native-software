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
  turfTypes: string[];
  surface: string;
  net: number;
  images: string[];
};

type VenueStore = {
  formData: Partial<VenueFormData>;
  updateField: (field: string, value: any) => void;
  resetForm: () => void;
};

export const addVenueStore = create<VenueStore>(set => ({
  formData: {},
  updateField: (field, value) =>
    set(state => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),
  resetForm: () => set({formData: {}}),
}));
