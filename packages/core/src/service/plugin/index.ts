// TODO: get rid of this class
import semver, { satisfies } from 'semver';
import { v4 } from 'uuid';
import { Migration } from '../..';

import { migrate } from '../../migrations/migrate';
import { EditableType } from '../../types/editable';
import { EditorState } from '../../types/editor';
import { ContentPlugin, PluginBase, PluginBase, Plugins } from './classes';
import defaultPlugin from './default';
import { getPluginByIdAndVersion } from './getPluginByIdAndVersion';
import { contentMissing, layoutMissing } from './missing';

const find = (id: string, version = '*') => (
  plugin: PluginBase | ContentPlugin
): boolean =>
  (plugin.name === id || plugin.id === id) &&
  satisfies(plugin.version, version);

/**
 * Iterate through an editable content tree and generate ids where missing.
 */
export const generateMissingIds = (props: EditorState): EditorState => {
  const { rows, cells, id } = props;

  if ((rows || []).length > 0) {
    props.rows = rows.map(generateMissingIds);
  } else if ((cells || []).length > 0) {
    props.cells = cells.map(generateMissingIds);
  }

  return { ...props, id: id || v4() };
};

/**
 * PluginService is a registry of all content and layout plugins known to the editor.
 */
export default class PluginService {
  plugins: Plugins;

  /**
   * Instantiate a new PluginService instance. You can provide your own set of content and layout plugins here.
   */
  constructor({ content = [], layout = [] }: Plugins = {} as Plugins) {
    this.plugins = {
      content: [defaultPlugin, ...content],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      layout: layout,
    };
  }

  getPluginByIdAndVersion = (pluginId: string, version: string) => {
    const plugins = [...this.plugins.layout, ...this.plugins.content];
    return getPluginByIdAndVersion(plugins, pluginId, version);
  };

  /**
   * Finds a layout plugin based on its name and version.
   */
  findLayoutPlugin = (
    pluginId: string,
    version: string
  ): {
    plugin: PluginBase;
    pluginWrongVersion?: PluginBase;
  } => {
    const { plugin, pluginWrongVersion } = this.getPluginByIdAndVersion(
      pluginId,
      version
    );
    return {
      plugin: plugin || layoutMissing({ pluginId, version }),
      pluginWrongVersion,
    };
  };

  /**
   * Finds a content plugin based on its name and version.
   */
  findPluginBase = (
    pluginId: string,
    version: string
  ): {
    plugin: ContentPlugin;
    pluginWrongVersion?: ContentPlugin;
  } => {
    const { plugin, pluginWrongVersion } = this.getPluginByIdAndVersion(
      pluginId,
      version
    );
    return {
      plugin: plugin || contentMissing({ pluginId, version }),
      pluginWrongVersion,
    };
  };

  migratePluginState = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state: any,
    plugin: PluginBase,
    dataVersion: string
  ) => {
    return migrate(state, plugin?.migrations ?? [], dataVersion);
  };

  getNewPluginState = (
    found: { plugin: PluginBase; pluginWrongVersion?: PluginBase },

    state: unknown,
    stateI18n: {
      [lang: string]: unknown;
    },
    version: string
  ): {
    plugin: PluginBase;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state: unknown;
    stateI18n: {
      [lang: string]: unknown;
    };
  } => {
    const getResult = (plugin: PluginBase, shouldMigrate = false) => {
      // Attempt to migrate
      const unserialize = plugin.unserialize ? plugin.unserialize : (s) => s;
      const transformState = (s) => {
        if (shouldMigrate) {
          const migratedState = this.migratePluginState(
            s,
            found.pluginWrongVersion,
            version
          );
          return unserialize(migratedState);
        }
        return unserialize(s);
      };

      const result = {
        plugin: plugin,
        state: transformState(state),
        stateI18n: stateI18n
          ? Object.keys(stateI18n).reduce(
              (acc, lang) => ({
                ...acc,
                [lang]: transformState(stateI18n[lang]),
              }),
              {}
            )
          : undefined,
      };
      return result;
    };
    if (
      !found.pluginWrongVersion ||
      semver.lt(found.pluginWrongVersion.version, version)
    ) {
      // Standard case
      return getResult(found.plugin);
    } else {
      if (found.pluginWrongVersion) {
        return getResult(found.pluginWrongVersion, true);
      } else {
        return getResult(found.plugin);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  unserialize = (state: EditableType, migrations: Migration[]): any => {
    if (!state) {
      return;
    }
    const {
      cells = [],

      id,
      version,
    } = state;

    const newState: EditorState = { id, inline, size, isDraft, isDraftI18n };

    const {
      plugin: { name: contentName = null, version: contentVersion = '*' } = {},
    } = content || {};
    const {
      plugin: { name: layoutName = null, version: layoutVersion = '*' } = {},
    } = layout || {};

    if (contentName) {
      const found = this.findContentPlugin(contentName, contentVersion);
      const newContentState = this.getNewPluginState(
        found,
        content.state,
        content.stateI18n,
        contentVersion
      );
      newState.content = newContentState;
    }

    if (layoutName) {
      const found = this.findLayoutPlugin(layoutName, layoutVersion);
      const newLayoutState = this.getNewPluginState(
        found,
        layout.state,
        layout.stateI18n,
        layoutVersion
      );
      newState.layout = newLayoutState;
    }

    if ((rows || []).length) {
      newState.rows = rows.map(this.unserialize);
    }

    if ((cells || []).length) {
      newState.cells = cells.map(this.unserialize);
    }

    return generateMissingIds(newState);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serialize = (state: any): EditableType => {
    const {
      rows = [],
      cells = [],
      content,
      layout,
      inline,
      isDraft,
      isDraftI18n,
      size,
      id,
    } = state;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newState: any = { id, inline, size, isDraft, isDraftI18n };
    if (content && content.plugin) {
      const serialize = content.plugin.serialize
        ? content.plugin.serialize
        : (s) => s;

      newState.content = {
        plugin: { name: content.plugin.name, version: content.plugin.version },
        state: serialize(content.state),
        stateI18n: content.stateI18n
          ? Object.keys(content.stateI18n).reduce(
              (acc, lang) => ({
                ...acc,
                [lang]: serialize(content.stateI18n[lang]),
              }),
              {}
            )
          : undefined,
      };
    }

    if (layout && layout.plugin) {
      const serialize = layout.plugin.serialize
        ? layout.plugin.serialize
        : (s) => s;
      newState.layout = {
        plugin: { name: layout.plugin.name, version: layout.plugin.version },
        state: serialize(layout.state),
        stateI18n: layout.stateI18n
          ? Object.keys(layout.stateI18n).reduce(
              (acc, lang) => ({
                ...acc,
                [lang]: serialize(layout.stateI18n[lang]),
              }),
              {}
            )
          : undefined,
      };
    }

    if (rows.length) {
      newState.rows = rows.map(this.serialize);
    }

    if (cells.length) {
      newState.cells = cells.map(this.serialize);
    }

    return newState;
  };
}
