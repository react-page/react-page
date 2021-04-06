//import './wdyr';
export * from './core/types';
export * from './core/components/hooks';
export * from './ui';

import Cell, { CellProps } from './core/components/Cell';
import Row, { RowProps } from './core/components/Row';
export { Cell as EditorCell, CellProps, Row as EditorRow, RowProps };
export {
  HTMLCell,
  HTMLCellProps,
  HTMLRow,
  HTMLRowProps,
} from './renderer/HTMLRenderer';

import lazyLoad from './core/helper/lazyLoad';
import { Migration } from './core/migrations/Migration';

import Editor, { EditorProps } from './editor/Editor';
import makeUniformsSchema from './ui/AutoformControls/makeUniformsSchema';

import { migrateValue } from './core/migrations/migrate';
import deepEquals from './core/utils/deepEquals';

import { createValue } from './core/utils/createValue';
export { lazyLoad };
export { EditorProps };
export { Migration };
export { makeUniformsSchema };
export { createValue };
export { migrateValue };

export { deepEquals };
export default Editor;

export const VERSION = '###VERSION###';
