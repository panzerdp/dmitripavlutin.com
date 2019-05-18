export function slugify(str: string, toLowerCase = true) {
  if (toLowerCase) {
    str = str.toLowerCase();
  }
  return str.split(' ').join('-');
}