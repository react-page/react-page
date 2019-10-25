import { Value } from 'slate';
import SlatePlugin from '../types/SlatePlugin';

import flattenDeep from './flattenDeep';
import {
  InitialSlateStateDef,
  SlateDefNode,
  SlatePluginNode
} from '../types/initialSlateState';

/**
 * FIXME: transformInitialSlateState does some polymorphic type magic, so that it is directly
 * compatible with the shipped default plugins or plugins created with pluginFactories
 *
 * This is a bit ugly and might be hard to understand,
 * but on the other hand its easy to use for developers that use this library
 *
 * Basicaly what we do is to unpack the factory or its result until we find
 * - object: "block" | "inline" | "mark"
 * - type: "SOMESTRING"
 *
 * We might revisit this in the future.
 *
 */

const transformChildren = (defNodes: SlateDefNode[]) =>
  defNodes.map(defNode => {
    if ((defNode as SlatePluginNode).plugin) {
      const defPluginNode: SlatePluginNode = defNode as SlatePluginNode;
      const slatePluginOrList =
        typeof defPluginNode.plugin === 'function'
          ? defPluginNode.plugin()
          : defPluginNode.plugin;

      // the result of plugin() might be an array, e.g. the list plugin is an array, because it defines ul, li AND indention-options on the same plugin
      const firstComponentPlugin = flattenDeep<SlatePlugin>(
        slatePluginOrList
      ).find(
        plugin =>
          plugin.pluginDefintion.pluginType === 'component' ||
          plugin.pluginDefintion
      );
      if (
        firstComponentPlugin &&
        firstComponentPlugin.pluginDefintion &&
        firstComponentPlugin.pluginDefintion.pluginType === 'component'
      ) {
        return {
          object: firstComponentPlugin.pluginDefintion.object,
          type: firstComponentPlugin.pluginDefintion.type,
          nodes: defPluginNode.children
            ? transformChildren(defPluginNode.children)
            : [],
        };
      } else {
        return null;
      }
    } else if (typeof defNode === 'string') {
      return {
        object: 'text',
        text: defNode as string,
      };
    }
  });

export default (def: InitialSlateStateDef) => ({
  editorState: Value.fromJSON({
    document: {
      nodes: transformChildren(def.children),
    },
  }),
});
