export const binaryTreeTraversal = (tree: any): string[] => {
  const output: string[] = []
  const queue: any[] = [];
  queue.push(tree);
  while (queue.length > 0) {
    const treeElement = queue.shift();
    output.push(treeElement.value);
    treeElement.leftChild && queue.push(treeElement.leftChild)
    treeElement.rightChild && queue.push(treeElement.rightChild)
  }
  return output;
};
