/* eslint-disable @typescript-eslint/ban-types */
import { v4 } from 'uuid';
import {
  ContentPluginConfig,
  LayoutPluginConfig,
} from '../../service/plugin/classes';

type CellDef = {
  content?: {
    plugin: ContentPluginConfig;
    state?: object;
  };
  layout?: {
    plugin: LayoutPluginConfig;
    state?: object;
  };
  size?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
export type RowDef = CellDef[];

export type ChildrenDef = {
  id: string;
  rows: {
    id: string;
    cells: {
      id: string;
      content?: {
        plugin: ContentPluginConfig;
        state?: object;
      };
      layout?: {
        plugin: LayoutPluginConfig;
        state?: object;
      };
      size?: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    }[];
  }[];
};

export type InitialChildrenDef = RowDef[] | ChildrenDef;

const withDefaultState = (
  layoutOrContent: CellDef['layout'] | CellDef['content']
) => {
  const plugin = layoutOrContent.plugin;
  return {
    plugin,
    state: layoutOrContent.state || plugin.createInitialState?.(),
  };
};

export default (rows: RowDef[]): ChildrenDef => ({
  id: v4(),
  rows: rows.map((row) => ({
    id: v4(),
    cells: row.map(({ layout, content, ...rest }) => {
      return {
        id: v4(),
        layout: layout ? withDefaultState(layout) : undefined,
        content: content ? withDefaultState(content) : undefined,
        ...rest,
      };
    }),
  })),
});
