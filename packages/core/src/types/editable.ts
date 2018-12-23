/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

import * as React from 'react';
import {
  ContentPlugin,
  LayoutPlugin,
  ContentPluginProps,
  NativePluginConfig,
  ContentPluginConfig,
  LayoutPluginConfig,
} from '../service/plugin/classes';
import { PluginService } from '../index';

export type Config = {
  whitelist: Array<string>;
  plugins: PluginService;
};

// tslint:disable-next-line:no-any
export interface Content<StateT = any> {
  plugin: ContentPluginConfig;
  state: StateT;
}

// tslint:disable-next-line:no-any
export interface Layout<StateT = any> {
  plugin: LayoutPluginConfig;
  state: StateT;
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

  children?: React.ReactChildren;

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

  updateDimensions: Function;
  onResize: Function;
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
  updateCellContent(state: Object): void;
  updateCellLayout(state: Object): void;
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

  onChange(state: Object): void;
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
  hasInlineChildren?: boolean;
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
  hasInlineChildren: false,
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
  defaultPlugin: ContentPluginProps;

  blurAllCells(): void;
  createFallbackCell(plugin: ContentPlugin | LayoutPlugin, id: string): void;
};

export type Editables = {
  past: EditableType[];
  present: EditableType[];
  future: EditableType[];
};

export type NativeFactory = (
  // tslint:disable-next-line:no-any
  hover?: any,
  // tslint:disable-next-line:no-any
  monitor?: any,
  // tslint:disable-next-line:no-any
  component?: any
) => NativePluginConfig;
