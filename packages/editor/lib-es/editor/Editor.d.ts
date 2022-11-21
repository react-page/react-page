import type { FC, PropsWithChildren } from 'react';
import type { Callbacks, Options, RenderOptions, ValueWithLegacy } from '../core/types';
export type EditorProps = {
    /**
     * the current value to display
     */
    value?: ValueWithLegacy | null;
    /**
     * set readOnly=true if you just want to display the content. This will only load the nesseary code.
     */
    readOnly?: boolean;
    /**
     * pass the current language of the content
     */
    lang?: string;
} & Options & Callbacks & RenderOptions;
declare const Editor: FC<PropsWithChildren<EditorProps>>;
export default Editor;
//# sourceMappingURL=Editor.d.ts.map