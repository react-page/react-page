import { HTML5Backend } from 'react-dnd-html5-backend';
import { DISPLAY_MODE_EDIT } from './actions/display';
import { defaultTheme } from '../ui';
export var DEFAULT_OPTIONS = {
    allowMoveInEditMode: true,
    allowResizeInEditMode: true,
    childConstraints: {},
    components: {},
    languages: [],
    uiTranslator: null,
    zoomEnabled: true,
    zoomFactors: [1, 0.75, 0.5, 0.25],
    undoRedoEnabled: true,
    editEnabled: true,
    insertEnabled: true,
    layoutEnabled: true,
    resizeEnabled: true,
    previewEnabled: true,
    dndBackend: HTML5Backend,
    blurGateDefaultMode: DISPLAY_MODE_EDIT,
    blurGateDisabled: false,
    middleware: [],
    store: null,
    hideEditorSidebar: false,
    showMoveButtonsInBottomToolbar: true,
    showMoveButtonsInLayoutMode: true,
    sidebarPosition: 'rightAbsolute',
    customOptions: [],
    uiTheme: defaultTheme,
};
export var DEFAULT_RENDER_OPTIONS = {
    cellPlugins: [],
    cellSpacing: null,
};
//# sourceMappingURL=defaultOptions.js.map