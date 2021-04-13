import type { CellHoverAction } from './drag';
import { dragActions } from './drag';
import type { InsertAction } from './insert';
import { insertActions } from './insert';
import type { CellCoreAction } from './core';
import { coreActions } from './core';
export const cellActions = { ...dragActions, ...insertActions, ...coreActions };
export * from './insert';
export * from './core';
export * from './drag';

export type CellAction = CellCoreAction | CellHoverAction | InsertAction;
