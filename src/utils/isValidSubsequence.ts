export const isValidSubsequence = (
  array: number[],
  sequence: number[],
): boolean => {
  if (array.length === 0 || sequence.length === 0) return false;
  let arrayIndex = 0;
  let sequenceIndex = 0;
  while (arrayIndex < array.length && sequenceIndex < sequence.length) {
    if (array[arrayIndex] === sequence[sequenceIndex]) sequenceIndex++;
    arrayIndex++;
  }
  return sequenceIndex === sequence.length;
}
