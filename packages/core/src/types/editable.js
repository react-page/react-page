// @flow
/* eslint no-use-before-define: off */
import { ContentPlugin, LayoutPlugin } from '../service/plugin/classes'

export type Config = {
  whitelist: Array<string>
}

type AbstractCell<T> = {
  id: string,

  rows: Array<T>,

  content?: {
    plugin: ContentPlugin,
    state: Object
  },
  layout?: {
    plugin: LayoutPlugin,
    state: Object
  },

  size: number,
  hover: ?string,
  inline: ?string,
  focused: boolean,
  focusSource: string,
  resizable: boolean,
  bounds: { left: number, right: number },
  hasInlineNeighbour: ?string,
  levels: {
    above: number,
    below: number,
    right: number,
    left: number
  }
}

export type Cell = AbstractCell<Row>

export const createCell = (): Cell => ({
  id: '',
  rows: [],
  size: 12,
  hover: null,
  inline: null,
  focused: false,
  focusSource: '',
  resizable: false,
  bounds: { left: 0, right: 0 },
  hasInlineNeighbour: null,
  levels: {
    above: 0,
    below: 0,
    right: 0,
    left: 0
  }
})

export type ComponetizedCell = {
  id: string,
  editable: string,
  ancestors: Array<string>,
  config: Config,

  children: any,

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
  styles: any,

  // the raw signatures of the following actions are different (e.g. `(id) => (state): Action`) but
  // when mapping to props, only signature of the most inner method is used (`(state): Action`).
  clearHover(): void,
  removeCell(): void,
  resizeCell(id: string): void,
  focusCell(): void,
  blurCell(id: string): void,
  blurAllCells(): void,
  updateCellContent(state: Object): void,
  updateCellLayout(state: Object): void,
  cancelCellDrag(): void,

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
  insertCellRightOf(type: string): void,

  onChange(state: any): void
}

type AbstractRow<T> = {
  id: string,
  hover: ?string,
  cells: Array<T>,
  hasInlineChildren: boolean
}

export type Row = AbstractRow<Cell>

export const createRow = (): Row => ({
  id: '',
  hover: null,
  cells: [],
  hasInlineChildren: false
})

export type ComponetizedRow = {
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
  cancelCellDrag(): void,
  blurAllCells(): void
}

type AbstractEditable<T> = {
  id: string,
  config: Config,
  cells: Array<T>,
  cellOrder: Array<{ id: string, isLeaf: boolean }>
}

export type Editable = AbstractEditable<Cell>

export type EditableComponentState = {
  id: string,
  node: AbstractEditable<string>,

  containerHeight: number,
  containerWidth: number,
  isInsertMode: boolean,
  isResizeMode: boolean,
  isDisplayMode: boolean,
  isEditMode: boolean,
  isLayoutMode: boolean,
  isPreviewMode: boolean,
  defaultPlugin: any,

  blurAllCells(): void,
  createFallbackCell(): void
}

export type NativeFactory = (hover: any, monitor: any, component: any) => Object
