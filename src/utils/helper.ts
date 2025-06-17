import dayjs, {Dayjs} from 'dayjs';
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
  start_time: Date;
  end_time: Date;
  isAvailable: true;
}

interface ResultData {
  all: (ParamsTypes[number] | AvailableSlot)[];
  upComing: ParamsTypes;
  available: AvailableSlot[];
  completed: ParamsTypes;
}

export const A = (data: ParamsTypes): ResultData => {
  let result: ResultData = {
    all: [],
    upComing: [],
    available: [],
    completed: [],
  };

  const now = dayjs();
  const slots = Array.from({length: 24}, (_, i) =>
    dayjs().startOf('day').add(i, 'hour'),
  );

  const bookedRanges = data?.map(booking => ({
    start: dayjs(booking.start_time),
    end: dayjs(booking.end_time),
  }));

  const availableSlots = slots.filter(slot => {
    return !bookedRanges?.some(
      range => slot.isSameOrAfter(range.start) && slot.isBefore(range.end),
    );
  });

  let currentBlock: Dayjs[] = [];
  for (let i = 0; i < availableSlots.length; i++) {
    const current = availableSlots[i];
    const next = availableSlots[i + 1];

    currentBlock.push(current);
    const expectedNext = current.add(1, 'hour');

    if (!next || !next.isSame(expectedNext)) {
      const start = currentBlock[0];
      const end = current.add(currentBlock.length, 'hour');

      const availableSlot: AvailableSlot = {
        start_time: start.toDate(),
        end_time: end.toDate(),
        isAvailable: true,
      };

      result.available.push(availableSlot);
      currentBlock = [];
    }
  }

  const mergedAll = [
    ...(Array.isArray(data) ? data.filter(b => !b.is_cancel) : []),
    ...(Array.isArray(result.available) ? result.available : []),
  ].sort((a, b) => {
    const aTime = 'isAvailable' in a ? a.start_time : a.start_time;
    const bTime = 'isAvailable' in b ? b.start_time : b.start_time;
    return new Date(aTime).getTime() - new Date(bTime).getTime();
  });

  for (const item of mergedAll) {
    result.all.push(item);

    if ('isAvailable' in item) continue;

    const isPast = dayjs(item.start_time).isBefore(now);
    if (isPast) {
      result.completed.push(item);
    } else {
      result.upComing.push(item);
    }
  }

  return result;
};
