export const isValidSubsequence = (
  array: number[],
  subsequence: number[],
): boolean => {
  let currentSubsequencePosition = 0;
  const subsequenceElementsFound: number[] = []
  for (let i = 0; i < array.length; i++) {
    const arrayValue = array[i];
    for (let j = currentSubsequencePosition; j < subsequence.length; j++) {
      const subsequenceValue = subsequence[j];

      if (arrayValue === subsequenceValue) {
        subsequenceElementsFound.push(subsequenceValue);
        if (j === subsequence.length - 1 && subsequenceElementsFound.length === subsequence.length) return true;
        currentSubsequencePosition = j + 1;
        break;
      }
    }
  }

  return false;
};
