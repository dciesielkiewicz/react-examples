export const binaryTreeTraversalDepthFirst = (tree: any): string[] => {
  const output: string[] = []
  const addNodeValues = (remainingTree: any) => {
    output.push(remainingTree.value as string);
    remainingTree.leftChild && addNodeValues(remainingTree.leftChild)
    remainingTree.rightChild && addNodeValues(remainingTree.rightChild)
  };
  addNodeValues(tree);
  return output;
};
