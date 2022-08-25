import { lazy } from 'react';

export const ColorPicker = lazy(() => import('./ColorPicker'));
export const ColorPickerField = lazy(() => import('./ColorPickerField'));
export * from './colorToString';
export * from './types';
