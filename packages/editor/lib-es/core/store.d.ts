import type { Store, Middleware } from 'redux';
import type { RootState } from './types/state';
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (settings: unknown) => void;
    }
}
/**
 * Returns a new redux store.
 */
declare const _default: (initialState: Record<string, unknown>, middleware?: Middleware[]) => Store<RootState>;
export default _default;
//# sourceMappingURL=store.d.ts.map