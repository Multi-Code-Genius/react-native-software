import {create} from 'zustand';

interface BookingFormState {
  name: string;
  phone: string;
  venueId: number;
  date: string;
  startTime: string;
  endTime: string;
  bookedGrounds: number;
  totalAmount: number;

  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setVenueId: (venueId: number) => void;
  setDate: (date: string) => void;
  setStartTime: (startTime: string) => void;
  setEndTime: (endTime: string) => void;
  setBookedGrounds: (bookedGrounds: number) => void;
  setTotalAmount: (totalAmount: number) => void;

  resetForm: () => void;
}

export const useBookingFormStore = create<BookingFormState>(set => ({
  name: '',
  phone: '',
  venueId: 0,
  date: '',
  startTime: '',
  endTime: '',
  bookedGrounds: 0,
  totalAmount: 0,

  setName: name => set({name}),
  setPhone: phone => set({phone}),
  setVenueId: venueId => set({venueId}),
  setDate: date => set({date}),
  setStartTime: startTime => set({startTime}),
  setEndTime: endTime => set({endTime}),
  setBookedGrounds: bookedGrounds => set({bookedGrounds}),
  setTotalAmount: totalAmount => set({totalAmount}),

  resetForm: () =>
    set({
      name: '',
      phone: '',
      venueId: 0,
      date: '',
      startTime: '',
      endTime: '',
      bookedGrounds: 0,
      totalAmount: 0,
    }),
}));
