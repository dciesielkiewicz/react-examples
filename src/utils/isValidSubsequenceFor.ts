export const isValidSubsequence = (
  array: number[],
  sequence: number[],
): boolean => {
  if (array.length === 0 || sequence.length === 0) return false;
  let sequenceIndex = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === sequence[sequenceIndex]) sequenceIndex++;
    if (sequenceIndex === sequence.length) return true;
  }
  return false;
};
