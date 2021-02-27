//import './wdyr';
export * from './core/types';
export * from './core/components/hooks';
export * from './ui';

import lazyLoad from './core/helper/lazyLoad';
import { Migration } from './core/migrations/Migration';

import Editor, { EditorProps } from './editor/Editor';
import makeUniformsSchema from './ui/AutoformControls/makeUniformsSchema';

import { migrateValue } from './core/migrations/migrate';
import deepEquals from './core/utils/deepEquals';

export { lazyLoad };
export { EditorProps };
export { Migration };
export { makeUniformsSchema };

export { migrateValue };

export { deepEquals };
export default Editor;

export const VERSION = '###VERSION###';
