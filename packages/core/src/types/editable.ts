/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import PluginService from '../service/plugin';
import {
  ContentPlugin,
  ContentPluginConfig,
  LayoutPlugin,
  LayoutPluginConfig,
  NativePluginConfig,
} from '../service/plugin/classes';

export type Config = {
  whitelist: Array<string>;
  plugins: PluginService;
};

export type I18nField<T> = {
  [lang: string]: T;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Content<StateT = any> {
  plugin: ContentPluginConfig;
  state?: StateT;
  stateI18n?: I18nField<StateT>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Layout<StateT = any> {
  plugin: LayoutPluginConfig;
  state?: StateT;
  stateI18n?: I18nField<StateT>;
}

export type AbstractCell<T> = {
  id: string;

  rows?: T[];

  content?: Content;
  layout?: Layout;

  size?: number;
  hover?: string;
  inline?: string | null;
  focused?: boolean;
  scrollToCell?: Number;
  isDraft?: boolean;
  isDraftI18n?: I18nField<boolean>;
  focusSource?: string;
  resizable?: boolean;
  bounds?: { left: number; right: number };
  hasInlineNeighbour?: string;

  levels?: Levels;
};

export type Cell = AbstractCell<Row>;

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
    left: 0,
  },
});

export type ComponetizedCell = {
  id: string;
  editable: string;
  ancestors: Array<string>;
  config: Config;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;

  node: AbstractCell<string>;

  isInsertMode: boolean;
  isResizeMode: boolean;
  isDisplayMode: boolean;
  isEditMode: boolean;
  isLayoutMode: boolean;
  isPreviewMode: boolean;

  steps: number;
  rowHeight: number;
  rowWidth: number;

  updateDimensions: () => void;
  onResize: () => void;
  styles: React.CSSProperties;
  rawNode(): Cell;

  // the raw signatures of the following actions are different (e.g. `(id) => (state): Action`) but
  // when mapping to props, only signature of the most inner method is used (`(state): Action`).
  clearHover(): void;
  removeCell(): void;
  resizeCell(id: string): void;
  focusCell(props: { source?: string }): void;
  blurCell(id: string): void;

  blurAllCells(): void;
  updateCellContent(state: any, lang?: string): void;
  updateCellLayout(state: any, lang?: string): void;
  cancelCellDrag(): void;

  dragCell(drag: string): void;
  cellHoverAbove(drag: Cell, hover: Cell, level: number): void;
  cellHoverBelow(drag: Cell, hover: Cell, level: number): void;
  cellHoverLeftOf(drag: Cell, hover: Cell, level: number): void;
  cellHoverRightOf(drag: Cell, hover: Cell, level: number): void;
  cellHoverInlineLeft(drag: Cell, hover: Cell): void;
  cellHoverInlineRight(drag: Cell, hover: Cell): void;
  insertCellAbove(type: string): void;
  insertCellBelow(type: string): void;
  insertCellLeftInline(type: string): void;
  insertCellLeftOf(type: string): void;
  insertCellRightInline(type: string): void;
  insertCellRightOf(type: string): void;

  onChange(state: any): void;
};

export type Levels = {
  left: number;
  right: number;
  above: number;
  below: number;
};

export type Row = {
  id: string;
  hover?: string;
  cells?: Cell[];

  levels?: Levels;
  className?: string;
};

export type RowComponetized = {
  id: string;
  hover?: string;
  cells: Array<string>;
  hasInlineChildren: boolean;

  inline: boolean;
};

export const createRow = (): Row => ({
  id: '',
  hover: null,
  cells: [],
});

export type ComponetizedRow = {
  id: string;
  config: Config;
  editable: string;
  ancestors: Array<string>;
  containerWidth: number;
  containerHeight: number;

  node: RowComponetized;

  isInsertMode: boolean;
  isResizeMode: boolean;
  isDisplayMode: boolean;
  isEditMode: boolean;
  isLayoutMode: boolean;
  isPreviewMode: boolean;

  clearHover(drag: string): void;
  cancelCellDrag(id: string): void;
  blurAllCells(): void;
};

export type AbstractEditable<T> = {
  id: string;
  config?: Config;
  cells: Array<T>;
  cellOrder?: Array<{ id: string; isLeaf: boolean }>;
};

export type EditableType = AbstractEditable<Cell>;

export type EditableComponentState = {
  id: string;
  node: AbstractEditable<string>;

  containerHeight: number;
  containerWidth: number;
  isInsertMode: boolean;
  isResizeMode: boolean;
  isDisplayMode: boolean;
  isEditMode: boolean;
  isLayoutMode: boolean;
  isPreviewMode: boolean;
  displayMode: string;
  defaultPlugin: ContentPluginConfig | LayoutPluginConfig;

  blurAllCells(): void;
  createFallbackCell(plugin: ContentPlugin | LayoutPlugin, id: string): void;
};

export type Editables = {
  past: EditableType[];
  present: EditableType[];
  future: EditableType[];
};

export type NativeFactory = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hover?: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  monitor?: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: any
) => NativePluginConfig;

export type NewIds = {
  item: string;
  cell: string;
  others: [string, string, string];
};

export type SimplifiedModesProps = {
  allowResizeInEditMode?: boolean;
  editModeResizeHandle?: JSX.Element;
  allowMoveInEditMode?: boolean;
};
