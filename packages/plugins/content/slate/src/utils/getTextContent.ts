import type { Node } from 'slate';

export const getTextContents = (nodes: Node[]): string[] => {
  return nodes.reduce((acc, node) => {
    if (node.text) {
      return [...acc, node.text];
    } else if (node.children) {
      // see https://github.com/ianstormtaylor/slate/issues/3769
      return [...acc, ...getTextContents(node.children as Node[])];
    } else {
      return acc;
    }
  }, []);
};
