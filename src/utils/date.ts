const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function formatDate(date: string) {
  const dateInstance = new Date(date);
  return `${MONTHS[dateInstance.getMonth()]} ${dateInstance.getDate()}, ${dateInstance.getFullYear()}`;
}

export function formatDateToMonth(date: string) {
  const dateInstance = new Date(date);
  return `${MONTHS[dateInstance.getMonth()]} ${dateInstance.getFullYear()}`;
}

// Overload signatures
function greet(person: string): string;
function greet(persons: string[]): string[];

// Implementation signature
function greet(person: unknown): unknown {
  if (typeof person === 'string') {
    return `Hello, ${person}!`;
  } else if (Array.isArray(person)) {
    return person.map(name => `Hello, ${name}!`);
  }
  throw new Error('Unable to greet');
}

