interface INumsMap {
  [key: number]: number[];
}

export const twoSum = (
  nums: number[],
  target: number
): [number, number] | undefined => {
  const numsMap: INumsMap = nums.reduce((acc, num, index) => {
      if (num < target) {
          acc[num] ? acc[num].push(index) : acc[num] = [index]
      }
      return acc;
  }, {} as INumsMap);

  const filteredNums = Object.keys(numsMap).map(Number);

  for (let i = 0; i < filteredNums.length; i++) {
      const value = filteredNums[i];
      const pairValue = target - value;
      const indexes = numsMap[value];

      if (value === pairValue) {
          return indexes.length > 1
              ? indexes.slice(0,2) as [number, number]
              : undefined;
      }

      const pairIndexes = numsMap[pairValue];
      if (pairIndexes) {
          const [index] = indexes;
          const [pairIndex] = pairIndexes;
          return [index, pairIndex];
      }
  }
};
