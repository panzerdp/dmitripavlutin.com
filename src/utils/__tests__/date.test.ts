import { formatDate } from '../date';

describe('formatDate()', function() {
  test('should format the date', function() {
    expect(formatDate('2019-01-01')).toStrictEqual('January 1, 2019');
    expect(formatDate('2020-12-31')).toStrictEqual('December 31, 2020');
    expect(formatDate('2020-03-15')).toStrictEqual('March 15, 2020');
  });
});