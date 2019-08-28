import { generatePages } from '../utils';

describe('generatePages()', function() {
  it('should generate pages without gaps', function() {
    expect(generatePages(2, 2, 5)).toEqual([1, 2]);
    expect(generatePages(5, 5, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should generate pages with gaps', function() {
    expect(generatePages(9, 10, 5)).toEqual([1, 7, 8, 9, 10]);
    expect(generatePages(4, 10, 5)).toEqual([1, 3, 4, 5, 10]);
    expect(generatePages(1, 10, 5)).toEqual([1, 2, 3, 4, 10]);
  });
});
