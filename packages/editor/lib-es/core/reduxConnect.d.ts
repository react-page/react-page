import type { Dispatch } from 'react';
import React from 'react';
import type { RootState } from './types';
export declare const ReduxContext: React.Context<any>;
export declare const ReduxProvider: ({ store, ...props }: any) => JSX.Element;
export declare const useStore: () => import("redux").Store<RootState, import("redux").AnyAction>;
export declare const useDispatch: () => Dispatch<any>;
export declare const useSelector: <Selected extends unknown>(selector: (state: RootState) => Selected, equalityFn?: ((previous: Selected, next: Selected) => boolean) | undefined) => Selected;
//# sourceMappingURL=reduxConnect.d.ts.map