import { addDigits } from './addDigits';

describe('addDigits', () => {
  test('Should work properly', () => {
    expect(addDigits(457)).toBe(16);
    expect(addDigits(38)).toBe(11);
    expect(addDigits(0)).toBe(0);
    expect(addDigits(10)).toBe(1);
  });
});
