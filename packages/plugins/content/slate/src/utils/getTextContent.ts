import { Node } from 'slate';

export const getTextContents = (nodes: Node[]): string[] => {
  return nodes.reduce((acc, node) => {
    if (node.text) {
      return [...acc, node.text];
    } else if (node.children) {
      return [...acc, ...getTextContents(node.children)];
    } else {
      return acc;
    }
  }, []);
};
