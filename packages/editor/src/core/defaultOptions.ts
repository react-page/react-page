import type { Options, RenderOptions } from './types';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DISPLAY_MODE_EDIT } from './actions/display';

export const DEFAULT_OPTIONS: Required<Options> = {
  allowMoveInEditMode: true,
  allowResizeInEditMode: true,

  childConstraints: null,
  components: {},
  languages: null,
  uiTranslator: null,
  zoomEnabled: true,
  zoomFactors: [1, 0.75, 0.5, 0.25],

  dndBackend: HTML5Backend,
  blurGateDefaultMode: DISPLAY_MODE_EDIT,
  blurGateDisabled: false,
  middleware: [],
  store: null,
  hideEditorSidebar: false,
  showMoveButtonsInBottomToolbar: true,
  showMoveButtonsInLayoutMode: true,
};

export const DEFAULT_RENDER_OPTIONS: Required<RenderOptions> = {
  cellPlugins: [],
  cellSpacing: null,
};
