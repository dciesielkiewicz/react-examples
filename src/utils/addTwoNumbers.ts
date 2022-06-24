const convertArrayToNumber = (numArr: number[]): number => parseInt(numArr.reverse().join(''));
const convertNumberToArray = (num: number): number[] => String(num).split('').map(Number).reverse();

export const addTwoNumbers = (numArr1: number[], numArr2: number[]): number[] => {
  const num1 = convertArrayToNumber(numArr1);
  const num2 = convertArrayToNumber(numArr2);
  const sum = num1 + num2;
  return convertNumberToArray(sum);
};
