import {create} from 'zustand';

interface BookingFormState {
  name: string;
  number: string;
  amount: string;
  startTime: string;
  endTime: string;
  setName: (name: string) => void;
  setNumber: (number: string) => void;
  setAmount: (amount: string) => void;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
  resetForm: () => void;
}

export const useBookingFormStore = create<BookingFormState>(set => ({
  name: '',
  number: '',
  amount: '',
  startTime: '',
  endTime: '',
  setName: name => set({name}),
  setNumber: number => set({number}),
  setAmount: amount => set({amount}),
  setStartTime: time => set({startTime: time}),
  setEndTime: time => set({endTime: time}),
  resetForm: () =>
    set({
      name: '',
      number: '',
      amount: '',
      startTime: '',
      endTime: '',
    }),
}));
