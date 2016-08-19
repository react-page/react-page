// @flow
/* eslint no-use-before-define: off */
import {
  clearHover,
  cancelCellDrag,
  dragCell,
  cellHoverLeftOf,
  cellHoverRightOf,
  cellHoverAbove,
  cellHoverBelow,
  cellHoverInlineLeft,
  cellHoverInlineRight,
  updateCell,
removeCell,
resizeCell,
focusCell,
blurCell,
  insertCellAbove,
  insertCellBelow,
  insertCellLeftInline,
  insertCellLeftOf,
  insertCellRightInline,
  insertCellRightOf
} from 'src/editor/actions/cell'
import { ContentPlugin, LayoutPlugin } from 'src/editor/service/plugin'

export type Config = {
  whitelist: Array<string>,
}

export type Cell = {
  id: string,

  rows: Array<Row>,

  content: {
    plugin: ContentPlugin,
    state: Object
  },
  layout: {
    plugin: LayoutPlugin,
    state: Object
  },

  size: number,
  hover: string,
  inline: string,
  focused: boolean,
  resizable: boolean,
  bounds: Array<number>,
  hasInlineNeighbour: boolean
}

export type CellComponentState = {
  id: string,
  ancestors: Array<string>,

  node: {
    // TODO remove duplication, #105
    id: string,

    rows: Array<string>,

    content: {
      plugin: ContentPlugin,
      state: Object
    },
    layout: {
      plugin: LayoutPlugin,
      state: Object
    },

    size: number,
    hover: string,
    inline: string,
    focused: boolean,
    resizable: boolean,
    bounds: Array<number>,
    hasInlineNeighbour: boolean
  },

  rawNode: () => Cell,

  isInsertMode: boolean,
  isResizeMode: boolean,
  isDisplayMode: boolean,
  isEditMode: boolean,
  isLayoutMode: boolean,
  isPreviewMode: boolean,

  steps: number,
  rowHeight: number,
  rowWidth: number,

  updateDimensions: Function,
  onResize: Function,

  removeCell:removeCell,
  resizeCell:resizeCell,
  focusCell:focusCell,
  blurCell:blurCell,
  updateCell: updateCell,
  dragCell: dragCell,
  clearHover: clearHover,
  cancelCellDrag: cancelCellDrag,
  cellHoverAbove: cellHoverAbove,
  cellHoverBelow: cellHoverBelow,
  cellHoverLeftOf: cellHoverLeftOf,
  cellHoverRightOf: cellHoverRightOf,
  cellHoverInlineLeft: cellHoverInlineLeft,
  cellHoverInlineRight: cellHoverInlineRight,
  insertCellAbove:insertCellAbove,
  insertCellBelow:insertCellBelow,
  insertCellLeftInline:insertCellLeftInline,
  insertCellLeftOf:insertCellLeftOf,
  insertCellRightInline:insertCellRightInline,
  insertCellRightOf:insertCellRightOf
}

export type Row = {
  id: string,
  hover: string,
  cells: Array<Cell>,
  hasInlineChildren: boolean,
}

export type RowComponentState = {
  id: string,
  config: Config,
  editable: string,
  ancestors: Array<string>,
  containerWidth: number,
  containerHeight: number,

  node: {
    // TODO remove duplication, #105
    id: string,
    hover: string,
    cells: Array<string>,
    hasInlineChildren: boolean,
  },

  isInsertMode: boolean,
  isResizeMode: boolean,
  isDisplayMode: boolean,
  isEditMode: boolean,
  isLayoutMode: boolean,
  isPreviewMode: boolean,
}

export type Editable = {
  id: string,
  config: Config,
  cells: Array<Cell>
}

export type EditableComponentState = {
  id: string,
  config: Config,
  node: {
    id: string,
    cells: Array<string>,
  },

  isInsertMode: boolean,
  isResizeMode: boolean,
  isDisplayMode: boolean,
  isEditMode: boolean,
  isLayoutMode: boolean,
  isPreviewMode: boolean,
}
