import { twoSortedArraysMedian } from './twoSortedArraysMedian';

describe(twoSortedArraysMedian, () => {
  test('Should work as expected', () => {
    expect(twoSortedArraysMedian([1,3], [2])).toBe(2);
    expect(twoSortedArraysMedian([1,2], [3,4])).toBe(2.5);
    
    expect(twoSortedArraysMedian([1,2,9,10,11], [70,80,90,100])).toBe(11);
    expect(twoSortedArraysMedian([1,2,9,10], [70,80,90,100])).toBe(40);

    expect(twoSortedArraysMedian([100,2,90,10,11], [70,80,9,1])).toBe(11);
    expect(twoSortedArraysMedian([100,2,90,10], [70,80,9,1])).toBe(40);
  });
});
