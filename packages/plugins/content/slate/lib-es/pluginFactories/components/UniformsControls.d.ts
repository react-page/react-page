/// <reference types="react" />
import type { JsonSchema } from '@react-page/editor';
import type { Data } from '../../types';
import type { SlatePluginControls } from '../../types/slatePluginDefinitions';
declare function Controls<T extends Data>(props: SlatePluginControls<T> & {
    schema?: JsonSchema<T>;
}): JSX.Element;
export default Controls;
//# sourceMappingURL=UniformsControls.d.ts.map