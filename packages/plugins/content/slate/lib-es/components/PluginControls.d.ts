import React from 'react';
import type { PluginButtonProps, SlatePluginDefinition } from '../types/slatePluginDefinitions';
type Props = {
    plugin: SlatePluginDefinition;
} & PluginButtonProps;
declare function PluginControls(props: Props & {
    open: boolean;
    close: () => void;
}): JSX.Element | null;
declare const _default: React.MemoExoticComponent<typeof PluginControls>;
export default _default;
//# sourceMappingURL=PluginControls.d.ts.map