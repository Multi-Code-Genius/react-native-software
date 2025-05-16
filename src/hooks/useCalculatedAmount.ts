export const calculatedAmount = (
  startTime: string,
  endTime: string,
  price: string,
): string | null => {
  const convertTo24Hour = (timeStr: any) => {
    const clean = timeStr.replace(/[^\x00-\x7F]/g, '').trim();
    const [time, meridiem] = clean.split(/ (AM|PM)/i).filter(Boolean);
    const [hourStr, minuteStr] = time.split(':');

    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    if (meridiem?.toUpperCase() === 'PM' && hour !== 12) hour += 12;
    if (meridiem?.toUpperCase() === 'AM' && hour === 12) hour = 0;

    return {hour, minute};
  };

  try {
    const start = convertTo24Hour(startTime);
    const end = convertTo24Hour(endTime);

    const startMs = start.hour * 60 + start.minute;
    const endMs = end.hour * 60 + end.minute;

    const diffMinutes = endMs - startMs;
    if (diffMinutes <= 0) {
      return null;
    }

    const durationHours = diffMinutes / 60;
    return String(Math.round(durationHours * Number(price)));
  } catch (e: any) {
    console.warn('Invalid time format:', e.message);
    return null;
  }
};
