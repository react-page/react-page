/* eslint-disable @typescript-eslint/ban-types */
import {
  ContentPlugin,
  ContentPluginConfig,
  LayoutPlugin,
  LayoutPluginConfig,
} from '../../service/plugin/classes';
import { v4 } from 'uuid';

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
        plugin: ContentPlugin;
        state?: object;
      };
      layout?: {
        plugin: LayoutPlugin;
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
  layoutOrContent: CellDef['layout'] | CellDef['content'],
  PluginClass
) => {
  const plugin = new PluginClass(layoutOrContent.plugin);
  return {
    plugin,
    state: layoutOrContent.state || plugin.createInitialState(),
  };
};

export default (rows: RowDef[]): ChildrenDef => ({
  id: v4(),
  rows: rows.map((row) => ({
    id: v4(),
    cells: row.map(({ layout, content, ...rest }) => {
      return {
        id: v4(),
        layout: layout ? withDefaultState(layout, LayoutPlugin) : undefined,
        content: content ? withDefaultState(content, ContentPlugin) : undefined,
        ...rest,
      };
    }),
  })),
});
