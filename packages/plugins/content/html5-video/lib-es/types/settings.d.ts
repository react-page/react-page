/// <reference types="react" />
import type { CellPluginComponentProps } from '@react-page/editor';
import type { Html5VideoState } from './state';
import type { Translations } from './translations';
export interface Html5VideoSettings {
    Renderer: React.ComponentType<CellPluginComponentProps<Html5VideoState>>;
    translations?: Translations;
    icon?: React.ReactNode;
    isInlineable?: boolean;
}
//# sourceMappingURL=settings.d.ts.map