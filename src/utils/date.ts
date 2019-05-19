const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function formatDate(date: string) {
  const dateInstance = new Date(date);
  return `${MONTHS[dateInstance.getMonth()]} ${dateInstance.getDate()}, ${dateInstance.getFullYear()}`;
}