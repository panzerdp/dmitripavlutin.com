import { formatDate, formatDateToMonth } from '../date';

describe('formatDate()', function() {
  test('should format the date', function() {
    expect(formatDate('2019-01-01')).toStrictEqual('January 1, 2019');
    expect(formatDate('2020-12-31')).toStrictEqual('December 31, 2020');
    expect(formatDate('2020-03-15')).toStrictEqual('March 15, 2020');
    expect(formatDate('2019-07-10T10:00:00Z')).toStrictEqual('July 10, 2019');
  });
});

describe('formatDateToMonth()', function() {
  test('should format the date', function() {
    expect(formatDateToMonth('2019-01-01')).toStrictEqual('January 2019');
    expect(formatDateToMonth('2020-12-31')).toStrictEqual('December 2020');
    expect(formatDateToMonth('2020-03-15')).toStrictEqual('March 2020');
    expect(formatDateToMonth('2019-07-10T10:00:00Z')).toStrictEqual('July 2019');
  });
});
