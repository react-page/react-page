import type { DataTType } from '@react-page/editor';
import type { NodeEntry } from 'slate';
import { Editor } from 'slate';
import type { SlatePluginDefinition } from '../types/slatePluginDefinitions';
export declare const getCurrentNodeWithPlugin: <T extends DataTType>(editor: Editor, plugin: SlatePluginDefinition<T>) => NodeEntry | null;
declare const _default: <T extends DataTType>(plugin: SlatePluginDefinition<T>) => NodeEntry<import("slate").Node> | null;
export default _default;
//# sourceMappingURL=useCurrentNodeWithPlugin.d.ts.map