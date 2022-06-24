export const addDigits = (num: number): number => {
  const digits = `${num}`.split('').map(Number);
  return digits.reduce((sum, currentNumber) => sum + currentNumber, 0);
};
