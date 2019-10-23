import {
  ContentPlugin,
  ContentPluginConfig,
  LayoutPlugin,
  LayoutPluginConfig
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
  rows: rows.map(row => ({
    id: v4(),
    cells: row.map(cell => {
      return {
        id: v4(),
        layout: cell.layout
          ? withDefaultState(cell.layout, LayoutPlugin)
          : undefined,
        content: cell.content
          ? withDefaultState(cell.content, ContentPlugin)
          : undefined,
      };
    }),
  })),
});
