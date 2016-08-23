// @flow
/* eslint no-use-before-define: off */
import { ContentPlugin, LayoutPlugin } from 'src/editor/service/plugin/classes'

export type Config = {
  whitelist: Array<string>,
}

type AbstractCell<T> = {
  id: string,

  rows: Array<T>,

  content: {
    plugin: ContentPlugin,
    state: Object
  },
  layout: {
    plugin: LayoutPlugin,
    state: Object
  },

  size: number,
  hover: ?string,
  inline: ?string,
  focused: boolean,
  resizable: boolean,
  bounds: { left: number, right: number },
  hasInlineNeighbour: ?string,
  levels: {
    above: number,
    below: number,
    right: number,
    left: number
  }
};

export type Cell = AbstractCell<Row>

export type ComponentizedCell = {
  id: string,
  ancestors: Array<string>,
  config: Config,

  node: AbstractCell<string>,
  rawNode(): Cell,

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

  clearHover(): void,
  removeCell(id: string): void,
  resizeCell(id: string): void,
  focusCell(id: string): void,
  blurCell(id: string): void,
  updateCell(id: string): void,
  cancelCellDrag(drag: string): void,

  dragCell(drag: string): void,
  cellHoverAbove(drag: Cell, hover: Cell, level: number): void,
  cellHoverBelow(drag: Cell, hover: Cell, level: number): void,
  cellHoverLeftOf(drag: Cell, hover: Cell, level: number): void,
  cellHoverRightOf(drag: Cell, hover: Cell, level: number): void,
  cellHoverInlineLeft(drag: Cell, hover: Cell): void,
  cellHoverInlineRight(drag: Cell, hover: Cell): void,
  insertCellAbove(type: string): void,
  insertCellBelow(type: string): void,
  insertCellLeftInline(type: string): void,
  insertCellLeftOf(type: string): void,
  insertCellRightInline(type: string): void,
  insertCellRightOf(type: string): void
}

type AbstractRow<T> = {
  id: string,
  hover: ?string,
  cells: Array<T>,
  hasInlineChildren: boolean,
}

export type Row = AbstractRow<Cell>

export type ComponentizedRow = {
  id: string,
  config: Config,
  editable: string,
  ancestors: Array<string>,
  containerWidth: number,
  containerHeight: number,

  node: AbstractRow<string>,

  isInsertMode: boolean,
  isResizeMode: boolean,
  isDisplayMode: boolean,
  isEditMode: boolean,
  isLayoutMode: boolean,
  isPreviewMode: boolean,

  clearHover(): void,
  cancelCellDrag(drag: string): void,
}

type AbstractEditable<T> = {
  id: string,
  config: Config,
  cells: Array<T>
}

export type Editable = AbstractEditable<Cell>

export type EditableComponentState = {
  id: string,
  node: AbstractEditable<string>,
  isInsertMode: boolean,
  isResizeMode: boolean,
  isDisplayMode: boolean,
  isEditMode: boolean,
  isLayoutMode: boolean,
  isPreviewMode: boolean,
}
