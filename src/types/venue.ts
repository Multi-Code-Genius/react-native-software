export interface GameInfo {
  surface: string;
  indoor: string;
  outdoor: string;
  roof: string;
}

export interface Location {
  area: string;
  city: string;
}

export interface VenueFormDetails {
  name: string;
  description: string;
  address: string;
  location: Location;
  capacity: string;
  category: string;
  hourlyPrice: string;
  net: string;
  turfType: string;
  gameInfo: GameInfo;
  images: string[];
}

export const defaultFormData: VenueFormDetails = {
  name: '',
  description: '',
  address: '',
  location: {
    area: '',
    city: '',
  },
  capacity: '',
  category: '',
  hourlyPrice: '',
  net: '',
  turfType: '',
  gameInfo: {
    surface: '',
    indoor: 'false',
    outdoor: 'false',
    roof: 'false',
  },
  images: [],
};
