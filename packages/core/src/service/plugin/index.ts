// TODO: get rid of this class
import semver, { satisfies } from 'semver';
import { v4 } from 'uuid';
import { EditableType } from '../../types/editable';
import { EditorState } from '../../types/editor';
import { ContentPlugin, LayoutPlugin, PluginBase, Plugins } from './classes';
import defaultPlugin from './default';
import { contentMissing, layoutMissing } from './missing';

const find = (name: string, version = '*') => (
  plugin: LayoutPlugin | ContentPlugin
): boolean => plugin.name === name && satisfies(plugin.version, version);

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

  /**
   * Finds a layout plugin based on its name and version.
   */
  findLayoutPlugin = (
    name: string,
    version: string
  ): {
    plugin: LayoutPlugin;
    pluginWrongVersion?: LayoutPlugin;
  } => {
    const plugin = this.plugins.layout.find(find(name, version));
    let pluginWrongVersion = undefined;
    if (!plugin) {
      pluginWrongVersion = this.plugins.layout.find(find(name, '*'));
    }
    return {
      plugin: plugin || layoutMissing({ name, version }),
      pluginWrongVersion,
    };
  };

  /**
   * Finds a content plugin based on its name and version.
   */
  findContentPlugin = (
    name: string,
    version: string
  ): {
    plugin: ContentPlugin;
    pluginWrongVersion?: ContentPlugin;
  } => {
    const plugin = this.plugins.content.find(find(name, version));
    let pluginWrongVersion = undefined;
    if (!plugin) {
      pluginWrongVersion = this.plugins.content.find(find(name, '*'));
    }
    return {
      plugin: plugin || contentMissing({ name, version }),
      pluginWrongVersion,
    };
  };

  /**
   * Returns a list of all known plugin names.
   */
  getRegisteredNames = (): Array<string> => [
    ...this.plugins.content.map(({ name }) => name),
    ...this.plugins.layout.map(({ name }) => name),
  ];

  migratePluginState = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state: any,
    plugin: PluginBase,
    dataVersion: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any => {
    if (!plugin || !dataVersion || semver.valid(dataVersion) === null) {
      return state;
    }
    let currentDataVersion = dataVersion;
    let migrations = plugin.migrations ? plugin.migrations : [];
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const migration = migrations.find((m) =>
        semver.satisfies(currentDataVersion, m.fromVersionRange)
      );
      migrations = migrations.filter(
        (m) => !semver.satisfies(currentDataVersion, m.fromVersionRange)
      );
      if (!migration) {
        // We assume all migrations necessary for the current version of plugin to work are provided
        // Therefore if we don't find any, that means we are done and state is up to date
        break;
      }
      currentDataVersion = migration.toVersion;
      state = migration.migrate(state);
    }
    return state;
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
  unserialize = (state: any): any => {
    if (!state) {
      return;
    }
    const {
      rows = [],
      cells = [],
      content = {},
      layout = {},
      inline,
      size,
      isDraft,
      isDraftI18n,
      id,
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
