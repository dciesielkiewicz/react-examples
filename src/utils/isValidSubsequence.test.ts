import { isValidSubsequence } from './isValidSubsequence';

const largeArray = new Array(10000000).fill(0);

describe('isValidSubsequence', () => {
  test('Should work properly', () => {
    expect(isValidSubsequence([1, 2, 3, 4], [1, 2, 4])).toBeTruthy()
    expect(isValidSubsequence([1, 2, 3, 4], [2, 3])).toBeTruthy()
    expect(isValidSubsequence([1, 2, 3, 4], [2, 4])).toBeTruthy()
    expect(isValidSubsequence([1, 2, 3, 3, 4], [3, 3])).toBeTruthy()
    expect(isValidSubsequence([5, 1, 22, 25, 6, -1, 8, 10], [1, 6, -1, 10])).toBeTruthy()
    expect(isValidSubsequence([1, 2, 3, 4], [2, 1])).toBeFalsy()
    expect(isValidSubsequence([1, 2, 3, 4], [2, 5])).toBeFalsy()
    expect(isValidSubsequence([3, 3], [1, 2, 3, 4])).toBeFalsy()
    expect(isValidSubsequence([1, 2, 3, 4], [1, 2, 3, 4, 5])).toBeFalsy()
    expect(isValidSubsequence([], [1, 2, 3, 4])).toBeFalsy()
    expect(isValidSubsequence([], [])).toBeFalsy()
  });

  test('Properly handle large arrays', () => {
    expect(isValidSubsequence([...largeArray, 1, 2], [1, 2])).toBeTruthy()
  });
});
