export const moveZeroes = (nums: number[]): number[] => {
  const numbers = [];
  const zeroes = [];
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    num === 0 ? zeroes.push(num) : numbers.push(num);
  }
  return [...numbers, ...zeroes];
};
