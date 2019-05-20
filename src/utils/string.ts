const REGEXP_NON_ALPHANUM = /([^a-zA-Z0-9\s])/g;

export function slugify(str: string, toLowerCase: boolean = true) {
  if (toLowerCase) {
    str = str.toLowerCase();
  }
  str = str.replace(REGEXP_NON_ALPHANUM, ' ');
  return str
    .split(' ')
    .filter((char) => char !== '')
    .join('-');
}
