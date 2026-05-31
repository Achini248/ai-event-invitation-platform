/**
 * Convert a 12-hour time string like "09:30 AM" to 24-hour "09:30"
 * for display or comparison purposes.
 */
export const to24Hour = (timeStr) => {
  if (!timeStr) return '';
  const [time, modifier] = timeStr.trim().split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

/**
 * Format a UTC ISO timestamp to a readable string.
 * e.g. "2024-11-14T09:32:00.000Z" → "14 Nov 2024, 09:32 UTC"
 */
export const formatUTC = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZone: 'UTC',
  }) + ' UTC';
};
