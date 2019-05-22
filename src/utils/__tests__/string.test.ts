import { slugify } from '../string';

describe('slugify()', function() {
  test('should slugify a string', function() {
    expect(slugify('JavaScript tutorial')).toStrictEqual('javascript-tutorial');
    expect(slugify('this keyword in JavaScript')).toStrictEqual('this-keyword-in-javascript');
    expect(slugify('this')).toStrictEqual('this');
    expect(slugify('9 ways to write better Code')).toStrictEqual('9-ways-to-write-better-code');
  });

  test('should remove non alphanumeric characters', function() {
    expect(slugify('   JavaScript -- ')).toStrictEqual('javascript');
    expect(slugify('JavaScript"s tutorial')).toStrictEqual('javascript-s-tutorial');
    expect(slugify(' JavaScript tutorial    -')).toStrictEqual('javascript-tutorial');
  });

  test('should not modify the case', function() {
    expect(slugify('   JavaScript -- ', false)).toStrictEqual('JavaScript');
    expect(slugify('JavaScript tutorial', false)).toStrictEqual('JavaScript-tutorial');
  });
});
