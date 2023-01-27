import type { Node } from 'slate';
import type {
  InitialSlateStateDef,
  SlateDefNode,
  SlatePluginNode,
} from '../types/initialSlateState';
import type { SlatePlugin } from '../types/SlatePlugin';
import flattenDeep from './flattenDeep';

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

const transformChildren = (defNodes: SlateDefNode[]): Node[] =>
  defNodes.map((defNode) => {
    if ((defNode as SlatePluginNode).plugin) {
      const defPluginNode: SlatePluginNode = defNode as SlatePluginNode;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const slatePluginOrList = (defPluginNode.plugin as any).toPlugin
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (defPluginNode.plugin as any).toPlugin()
        : defPluginNode.plugin;

      // the result of plugin.toPlugin might be an array, e.g. the list plugin is an array, because it defines ul, li AND indention-options on the same plugin
      const firstComponentPlugin = flattenDeep<SlatePlugin>(
        slatePluginOrList
      ).find((plugin) => plugin.pluginType === 'component' || plugin);
      if (
        firstComponentPlugin &&
        firstComponentPlugin.pluginType === 'component'
      ) {
        return {
          type: firstComponentPlugin.type,
          ...(defPluginNode.data ?? {}),
          children: defPluginNode.children
            ? transformChildren(defPluginNode.children)
            : [],
        } as any;
      } else {
        return null;
      }
    } else if (typeof defNode === 'string') {
      return {
        text: defNode as string,
      };
    }
  });

export default (def: InitialSlateStateDef) => ({
  slate: transformChildren(def.children),
});
