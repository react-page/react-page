import type { FC, PropsWithChildren } from 'react';
import type { Callbacks, Options, RenderOptions, ValueWithLegacy } from '../types';
export type ProviderProps = {
    lang?: string;
    value: ValueWithLegacy | null;
    options: Options;
    callbacks: Callbacks;
    renderOptions: RenderOptions;
};
declare const Provider: FC<PropsWithChildren<ProviderProps>>;
export default Provider;
//# sourceMappingURL=index.d.ts.map