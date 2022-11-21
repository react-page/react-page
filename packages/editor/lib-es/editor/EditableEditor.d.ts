import type { BackendFactory } from 'dnd-core';
import type { FC, PropsWithChildren } from 'react';
import type { ProviderProps } from '../core/Provider';
import type { ValueWithLegacy } from '../core/types';
export type DndBackend = BackendFactory;
export type EditableEditorProps = {
    value?: ValueWithLegacy | null;
    lang?: string;
} & ProviderProps;
declare const EditableEditor: FC<PropsWithChildren<EditableEditorProps>>;
export default EditableEditor;
//# sourceMappingURL=EditableEditor.d.ts.map