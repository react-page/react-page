import type { DataTType } from '@react-page/editor';
import type { Editor } from 'slate';
import type { SlatePluginDefinition } from '../types/slatePluginDefinitions';
export declare const getCurrentNodeDataWithPlugin: <T extends DataTType>(editor: Editor, plugin: SlatePluginDefinition<T>) => T;
declare const _default: <T extends DataTType>(plugin: SlatePluginDefinition<T>) => T;
export default _default;
//# sourceMappingURL=useCurrentNodeDataWithPlugin.d.ts.map