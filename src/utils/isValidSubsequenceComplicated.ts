interface IArrayMap {
  [key: number]: number[];
}

interface IUsedValuesCounter {
  [key: number]: number[];
}

export const isValidSubsequence = (
  array: number[],
  sequence: number[],
): boolean => {
  if (array.length === 0 || sequence.length === 0) return false;

  let previousIndex: number = -1;
  const usedValues: IUsedValuesCounter = {};
  const arrayMap: IArrayMap = array.reduce((acc, num, index) => {
    acc[num] ? acc[num].push(index) : acc[num] = [index];
    return acc;
  }, {} as IArrayMap);

  for (let i = 0; i < sequence.length; i++) {
    const sequenceValue = sequence[i];
    const arrayMapValueIndexes = arrayMap[sequenceValue];
    if (!arrayMapValueIndexes) return false;

    const indexesUsedForValue = usedValues[sequenceValue]
      ? usedValues[sequenceValue].length
      : 0;

    const indexToValidate = arrayMapValueIndexes[indexesUsedForValue];
    if (indexToValidate === undefined) return false;

    if (previousIndex >= indexToValidate) {
      return false
    }

    previousIndex = indexToValidate
    usedValues[sequenceValue]
      ? usedValues[sequenceValue].push(indexToValidate)
      : usedValues[sequenceValue] = [indexToValidate]
  }

  return true;
};
