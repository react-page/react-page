import { lazy } from 'react';

// lazy load everything to avoid accidental bundle size increase
export const RaReactPageInput = lazy(() => import('./RaReactPageInput'));
export const RaSelectReferenceInputField = lazy(
  () => import('./RaSelectReferenceInputField')
);
