import {useMemo} from 'react';
import moment from 'moment';

export const unavailableHours = useMemo(() => {
  const now = moment();
  const currentMinutes = now.hours() * 60 + now.minutes();

  return [
    {
      start: 0,
      end: currentMinutes,
      enableBackgroundInteraction: true,
      backgroundColor: '#ccc',
    },
  ];
}, []);
