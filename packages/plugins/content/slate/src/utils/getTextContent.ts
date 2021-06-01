import type { Node, Text } from 'slate';

const isText = (node: Node): node is Text => {
  return Boolean((node as Text).text);
};
export const getTextContents = (nodes: Node[]): string[] => {
  return nodes.reduce((acc, node) => {
    if (isText(node)) {
      return [...acc, node.text];
    } else if (node.children) {
      // see https://github.com/ianstormtaylor/slate/issues/3769
      return [...acc, ...getTextContents(node.children as Node[])];
    } else {
      return acc;
    }
  }, []);
};
