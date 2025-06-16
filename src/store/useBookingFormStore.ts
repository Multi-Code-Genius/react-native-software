import {create} from 'zustand';
import dayjs from 'dayjs';

export interface BookingFormState {
  name: string;
  phone: string;
  venueId: number;
  date: string;
  startTime: dayjs.Dayjs;
  endTime: dayjs.Dayjs;
  bookedGrounds: number;
  totalAmount: number;
  hourlyPrice: number;

  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setVenueId: (venueId: number) => void;
  setDate: (date: string) => void;
  setStartTime: (startTime: dayjs.Dayjs) => void;
  setEndTime: (endTime: dayjs.Dayjs) => void;
  setBookedGrounds: (bookedGrounds: number) => void;
  setTotalAmount: (totalAmount: number) => void;
  setHourlyPrice: (hourlyPrice: number) => void;

  resetForm: () => void;
}

export const useBookingFormStore = create<BookingFormState>(set => {
  const initialDateString = dayjs().toISOString();
  const initialStartTime = dayjs(initialDateString).startOf('hour');
  const initialEndTime = dayjs(initialDateString)
    .startOf('hour')
    .add(1, 'hour');

  return {
    name: '',
    phone: '',
    venueId: 0,
    date: initialDateString,
    startTime: initialStartTime,
    endTime: initialEndTime,
    bookedGrounds: 0,
    totalAmount: 0,
    hourlyPrice: 0,

    setHourlyPrice: hourlyPrice => set({hourlyPrice}),
    setName: name => set({name}),
    setPhone: phone => set({phone}),
    setVenueId: venueId => set({venueId}),
    setDate: date =>
      set({
        date,
        startTime: dayjs(date).startOf('hour'),
        endTime: dayjs(date).startOf('hour').add(1, 'hour'),
      }),
    setStartTime: startTime => set({startTime}),
    setEndTime: endTime => set({endTime}),
    setBookedGrounds: bookedGrounds => set({bookedGrounds}),
    setTotalAmount: totalAmount => set({totalAmount}),

    resetForm: () => {
      const resetDateString = dayjs().format('YYYY-MM-DD');
      const resetStartTime = dayjs(resetDateString).startOf('hour');
      const resetEndTime = dayjs(resetDateString)
        .startOf('hour')
        .add(1, 'hour');
      set({
        name: '',
        phone: '',
        venueId: 0,
        date: resetDateString,
        startTime: resetStartTime,
        endTime: resetEndTime,
        bookedGrounds: 0,
        totalAmount: 0,
      });
    },
  };
});
