import { cellActions } from './cell';
import {
  editMode,
  insertMode,
  layoutMode,
  previewMode,
  resizeMode,
} from './display';
import { setLang } from './setting';

const Display = {
  insertMode,
  editMode,
  previewMode,
  layoutMode,
  resizeMode,
};

const Setting = {
  setLang,
};
const Cell = cellActions;

/**
 * @deprecated
 */
export const Actions = {
  Display,
  Cell,
  Setting,
};
