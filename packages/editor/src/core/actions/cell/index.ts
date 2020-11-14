import { CellHoverAction, dragActions } from './drag';
import { InsertAction, insertActions } from './insert';
import { CellCoreAction, coreActions } from './core';
export const cellActions = { ...dragActions, ...insertActions, ...coreActions };
export * from './insert';
export * from './core';
export * from './drag';

export type CellAction = CellCoreAction | CellHoverAction | InsertAction;
