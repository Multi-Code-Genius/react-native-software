import {create} from 'zustand';

export type VenueFormData = {
  name: string;
  description: string;
  category: string;
  location: {
    city: string;
    lat: number;
    lng: number;
    area: string;
  };
  address: string;
  gameInfo: {
    type: string;
    openingTime: string;
    closingTime: string;
  };
  ground_details: {
    ground: number;
    hourly_price: number;
    capacity: number;
    width: number;
    height: number;
  }[];
};

type VenueStore = {
  formData: Partial<VenueFormData>;
  setFormData: (data: VenueFormData) => void;
  updateField: (field: string, value: any) => void;
  updateGroundField: (
    index: number,
    field: keyof VenueFormData['ground_details'][0],
    value: any,
  ) => void;
  addGround: () => void;
  resetForm: () => void;
};

export const useVenueStore = create<VenueStore>(set => ({
  formData: {
    description: '',
    ground_details: [
      {
        ground: 1,
        width: 0,
        height: 0,
        capacity: 0,
        hourly_price: 0,
      },
    ],
  },

  setFormData: data => set({formData: data}),

  updateField: (field, value) =>
    set(state => {
      if (
        field === 'city' ||
        field === 'lat' ||
        field === 'lng' ||
        field === 'area'
      ) {
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

      if (
        field === 'type' ||
        field === 'maxPlayers' ||
        field === 'openingTime' ||
        field === 'closingTime'
      ) {
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

      // For root-level fields
      return {
        formData: {
          ...state.formData,
          [field]: value,
        },
      };
    }),

  updateGroundField: (index, field, value) =>
    set(state => {
      const grounds = state.formData.ground_details || [];
      const updatedGrounds = [...grounds];

      if (!updatedGrounds[index]) return state;

      updatedGrounds[index] = {
        ...updatedGrounds[index],
        [field]: value,
      };

      return {
        formData: {
          ...state.formData,
          ground_details: updatedGrounds,
        },
      };
    }),

  addGround: () =>
    set(state => {
      const existingGrounds = state.formData.ground_details || [];
      const newGroundNumber = existingGrounds.length + 1;

      const newGround = {
        ground: newGroundNumber,
        width: 0,
        height: 0,
        capacity: 0,
        hourly_price: 0,
      };

      return {
        formData: {
          ...state.formData,
          ground_details: [...existingGrounds, newGround],
        },
      };
    }),

  resetForm: () => set({formData: {}}),
}));
