export const twoSortedArraysMedian = (numArr1: number[], numArr2: number[]): number => {
  const sortedNumbers = [...numArr1, ...numArr2].sort((a, b) => a - b);
  const middleIndexValue = sortedNumbers.length / 2;
  const middleIndexRounded = Math.floor(middleIndexValue);

  const middleIndexes = middleIndexValue === middleIndexRounded
    ? [middleIndexValue - 1, middleIndexValue]
    : [middleIndexRounded];

  if (middleIndexes.length === 1) {
    const [index] = middleIndexes;
    return sortedNumbers[index];
  }
  
  const [firstIndex, secondIndex] = middleIndexes;
  return (sortedNumbers[firstIndex] + sortedNumbers[secondIndex]) / 2;
}
