export const parseTimeTo24Hour = (time12h: string) => {
  const [time, modifier] = time12h.split(/(AM|PM)/i);
  let [hours, minutes] = time.trim().split(':').map(Number);

  if (modifier.toUpperCase() === 'PM' && hours !== 12) {
    hours += 12;
  } else if (modifier.toUpperCase() === 'AM' && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
};
