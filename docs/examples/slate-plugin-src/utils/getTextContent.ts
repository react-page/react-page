import type { Node, Text } from 'slate';
import type { SlatePlugin } from '../types/SlatePlugin';

const isText = (node: Node): node is Text => {
  return Boolean((node as Text).text);
};
export const getTextContents = (
  nodes: Node[],
  options: { slatePlugins: SlatePlugin[] }
): string[] => {
  return nodes.reduce<string[]>((acc, node) => {
    if (isText(node)) {
      return [...acc, node.text];
    } else if (node.children) {
      const childTexts = getTextContents(node.children as Node[], options);

      const everyChildIsTextOrInline = node.children.every((n) => {
        if (isText(n)) return true;

        const p = options.slatePlugins.find(
          (f) => f.pluginType === 'component' && f.type === n.type
        );
        if (!p) return true; // could be data plugin or custom

        if (p.object === 'block') {
          return false;
        }

        return true;
      });

      return [
        ...acc,
        ...(everyChildIsTextOrInline ? [childTexts.join('')] : childTexts),
      ];
    } else {
      return acc;
    }
  }, []);
};
