import type { DataTType } from '@react-page/editor';
import type { Editor } from 'slate';
import type { SlatePluginDefinition } from '../types/slatePluginDefinitions';
export declare const removePlugin: <T extends DataTType>(editor: Editor, plugin: SlatePluginDefinition<T>) => void;
declare const _default: <T extends DataTType>(plugin: SlatePluginDefinition<T>) => () => void;
export default _default;
//# sourceMappingURL=useRemovePlugin.d.ts.map