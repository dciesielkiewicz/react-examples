import { twoSum } from './twoSum';

describe('twoSum', () => {
  test('Should work properly', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
    expect(twoSum([3, 3], 6)).toEqual([0, 1]);
    expect(twoSum([1, 3, 5, 4], 7)).toEqual([1, 3]);
    expect(twoSum([1, 3, 3, 4], 6)).toEqual([1, 2]);
    expect(twoSum([1, 3, 3, 4], 9)).toBeUndefined();
  });
});
