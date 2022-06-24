import { binaryTreeTraversal } from './binaryTreeTraversal';

const tree1 = {
  value: 0,
  leftChild: {
    value: 1,
    leftChild: {
      value: 3,
      leftChild: { value: 7 },
      rightChild: { value: 8 }
    },
    rightChild: {
      value: 4,
      leftChild: { value: 9 },
      rightChild: { value: 10 }
    }
  },
  rightChild: {
    value: 2,
    leftChild: {
      value: 5,
      leftChild: { value: 11 },
      rightChild: { value: 12 }
    },
    rightChild: {
      value: 6,
      leftChild: { value: 13 },
      rightChild: { value: 14 }
    }
  }
}

describe('binaryTreeTraversal', () => {
  test('Should work as expected', () => {
    expect(binaryTreeTraversal(tree1)).toEqual([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14])
  });
});
