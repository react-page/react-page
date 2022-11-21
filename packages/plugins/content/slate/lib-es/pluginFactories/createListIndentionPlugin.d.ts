/// <reference types="react" />
import type { SlatePlugin } from '../types/SlatePlugin';
type Definition = {
    iconIncrease: JSX.Element;
    iconDecrease: JSX.Element;
    listItemType: string;
    labelIncrease?: string;
    labelDecrease?: string;
};
declare function createListIndentionPlugin(def: Definition): {
    (customize: (def2: Definition) => Definition): any;
    toPlugin(): SlatePlugin[];
};
export default createListIndentionPlugin;
//# sourceMappingURL=createListIndentionPlugin.d.ts.map