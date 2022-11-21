import type { ComponentProps, ComponentType, ReactElement } from 'react';
import React from 'react';
/**
 *
 * @param factory function that retuns a promise of a component
 * @returns a lazy loaded component. you can pass a fallback to the component that renders on server or when the component is not loaded
 */
declare const loadable: <T extends ComponentType<any>>(factory: () => Promise<{
    default: T;
}>) => React.ForwardRefExoticComponent<React.PropsWithoutRef<ComponentProps<T> & {
    /**
     * render a fallback on server or if the component is not loaded
     */
    fallback?: ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
}> & React.RefAttributes<unknown>> & {
    load: () => Promise<unknown>;
};
export default loadable;
//# sourceMappingURL=index.d.ts.map