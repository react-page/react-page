export * from './core/types';
export * from './core/components/hooks';

import lazyLoad from './core/helper/lazyLoad';
import { Migration } from './core/migrations/Migration';

import Editor, { EditorProps } from './editor/Editor';
import makeUniformsSchema from './ui/AutoformControls/makeUniformsSchema';
import { AutoForm, AutoFields } from './ui/AutoformControls';
import { migrateValue } from './core/migrations/migrate';
export { AutoForm, AutoFields };

export * from './ui/ColorPicker';

export * from './ui/ImageUpload';
export { lazyLoad };
export { EditorProps };
export { Migration };
export { makeUniformsSchema };

export { migrateValue };

export default Editor;

export const VERSION = '###VERSION###';
