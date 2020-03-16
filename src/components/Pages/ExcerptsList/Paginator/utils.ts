export function generatePages(currentPage: number, nrOfPages: number, maxDisplayed: number) {
  if (maxDisplayed >= nrOfPages) {
    return Array.from({ length: nrOfPages }, (_, i) => i + 1);
  }
  const displayed = maxDisplayed - 2;
  let begin = currentPage - Math.floor(displayed / 2);
  if (begin < 2) {
    begin = 2;
  } else if (begin > nrOfPages - displayed) {
    begin = nrOfPages - displayed;
  }
  return [1, ...Array.from({ length: maxDisplayed - 2 }, (_, i) => begin + i), nrOfPages];
}
