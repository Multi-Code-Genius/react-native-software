import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);

interface GroundBooking {
  ground: string;
  count: number;
}

export const getBookingByGround = (venue: {
  bookings?: {booked_grounds: string}[];
}) => {
  let result: GroundBooking[] = [];

  venue?.bookings?.forEach(val => {
    let a = result.find(i => i.ground === val.booked_grounds);
    if (a) {
      a.count += 1;
    } else {
      result.push({ground: val.booked_grounds, count: 1});
    }
  });

  return result;
};

export type ParamsTypes = {
  id: string;
  user_id: number;
  venue_id: number;
  date: Date;
  start_time: Date;
  end_time: Date;
  status: string;
  is_cancel: boolean;
  booked_grounds: number;
  total_amount: number;
  customer_id: string;
  customer: {
    id: string;
    name: string;
    mobile: string;
    user_id: number;
    owner_id: number;
    venue_id: number;
    total_spent: number;
    created_at: Date;
    updated_at: Date;
  };
  created_at: Date;
  updated_at: Date;
}[];

export interface AvailableSlot {
  type: 'available';
  start_time: Date;
  end_time: Date;
  isAvailable: true;
}

export interface BookingSlot {
  type: 'booking';
  id: string;
  user_id: number;
  venue_id: number;
  date: Date;
  start_time: Date;
  end_time: Date;
  status: string;
  is_cancel: boolean;
  booked_grounds: number;
  total_amount: number;
  customer_id: string;
  customer: {
    id: string;
    name: string;
    mobile: string;
    user_id: number;
    owner_id: number;
    venue_id: number;
    total_spent: number;
    created_at: Date;
    updated_at: Date;
  };
  created_at: Date;
  updated_at: Date;
}

export type MergedSlot = AvailableSlot | BookingSlot;

interface ResultData {
  all: MergedSlot[];
  upComing: BookingSlot[];
  available: AvailableSlot[];
  completed: BookingSlot[];
}

export const A = (data: ParamsTypes): ResultData => {
  const now = dayjs();

  const validBookings: BookingSlot[] =
    Array.isArray(data) && data.length > 0
      ? data
          .filter(b => b && !b.is_cancel)
          .map(b => ({
            ...b,
            type: 'booking' as const,
          }))
      : [];

  const sorted = [...(Array.isArray(validBookings) ? validBookings : [])].sort(
    (a, b) =>
      new Date(a.start_time).getTime() - new Date(b.start_time).getTime(),
  );

  const available: AvailableSlot[] = [];

  const dayStart = dayjs().startOf('day');
  const dayEnd = dayStart.add(24, 'hour');

  if (sorted.length > 0 && dayjs(sorted[0].start_time).isAfter(dayStart)) {
    available.push({
      type: 'available',
      start_time: dayStart.toDate(),
      end_time: dayjs(sorted[0].start_time).toDate(),
      isAvailable: true,
    });
  }

  for (let i = 0; i < sorted.length - 1; i++) {
    const currentEnd = dayjs(sorted[i].end_time);
    const nextStart = dayjs(sorted[i + 1].start_time);
    if (currentEnd.isBefore(nextStart)) {
      available.push({
        type: 'available',
        start_time: currentEnd.toDate(),
        end_time: nextStart.toDate(),
        isAvailable: true,
      });
    }
  }

  if (
    sorted.length > 0 &&
    dayjs(sorted[sorted.length - 1].end_time).isBefore(dayEnd)
  ) {
    available.push({
      type: 'available',
      start_time: dayjs(sorted[sorted.length - 1].end_time).toDate(),
      end_time: dayEnd.toDate(),
      isAvailable: true,
    });
  }

  const upComing = sorted.filter(b => dayjs(b.start_time).isSameOrAfter(now));

  const completed = sorted.filter(b => dayjs(b.start_time).isBefore(now));

  const all: MergedSlot[] = [
    ...(Array.isArray(sorted) ? sorted : []),
    ...(Array.isArray(available) ? available : []),
  ].sort((a, b) => {
    const aTime = new Date(a.start_time).getTime();
    const bTime = new Date(b.start_time).getTime();
    return aTime - bTime;
  });

  return {
    all,
    upComing,
    completed,
    available,
  };
};
