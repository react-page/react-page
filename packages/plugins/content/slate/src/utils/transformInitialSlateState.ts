import { Value } from 'slate';
import SlatePlugin from '../types/SlatePlugin';

import flattenDeep from './flattenDeep';
import {
  InitialSlateStateDef,
  SlateDefNode,
  SlatePluginNode
} from '../types/initialSlateState';

const transformChildren = (defNodes: SlateDefNode[]) =>
  defNodes.map(defNode => {
    if ((defNode as SlatePluginNode).plugin) {
      const defPluginNode: SlatePluginNode = defNode as SlatePluginNode;
      const slatePlugin =
        typeof defPluginNode.plugin === 'function'
          ? defPluginNode.plugin()
          : defPluginNode.plugin;
      const firstComponentPlugin = flattenDeep<SlatePlugin>(slatePlugin).find(
        plugin => plugin.pluginDefintion.pluginType === 'component'
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
    } else {
      return {
        object: 'text',
        text: '',
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
