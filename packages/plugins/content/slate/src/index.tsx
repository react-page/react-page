import { CellPlugin, lazyLoad } from '@react-page/editor';
import React from 'react';

import SlateEditor from './components/SlateEditor';
import SlateProvider from './components/SlateProvider';
import { defaultTranslations } from './default/settings';
import { HtmlToSlate } from './htmlToSlate';
import v002 from './migrations/v002';
import v003 from './migrations/v003';
import v004 from './migrations/v004';
import * as pluginFactories from './pluginFactories/index';
import defaultPlugins from './plugins/index';
import type { InitialSlateStateDef } from './types/initialSlateState';
import type { SlatePluginCollection } from './types/SlatePlugin';
import type { SlateState } from './types/state';
import makeSlatePluginsFromDef from './utils/makeSlatePluginsFromDef';
import transformInitialSlateState from './utils/transformInitialSlateState';

const slatePlugins = defaultPlugins;

export {
  defaultPlugins,
  slatePlugins,
  pluginFactories,
  HtmlToSlate,
  SlateState,
};
const Subject = lazyLoad(() => import('@material-ui/icons/Subject'));
const Controls = lazyLoad(() => import('./components/Controls'));

const migrations = [v002, v003, v004];
type SlateDefinition<TPlugins extends SlatePluginCollection> = {
  icon: JSX.Element;
  plugins: TPlugins;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultPluginType: string;

  id: string;
  version: number;
  translations: typeof defaultTranslations;
  migrations: typeof migrations;
  allowInlineNeighbours: boolean;
  hideInMenu?: boolean;
};
type DefaultPlugins = typeof defaultPlugins;
type DefaultSlateDefinition = SlateDefinition<DefaultPlugins>;
export type CreateDataCustomizer<TPlugins> = ({
  plugins,
}: {
  plugins: TPlugins;
}) => InitialSlateStateDef;

export const DEFAULT_SLATE_PLUGIN_ID = 'ory/editor/core/content/slate';
const defaultConfig: DefaultSlateDefinition = {
  icon: <Subject />,
  plugins: defaultPlugins,
  defaultPluginType: 'PARAGRAPH/PARAGRAPH',

  id: DEFAULT_SLATE_PLUGIN_ID,
  version: 1,
  translations: defaultTranslations,
  migrations,

  allowInlineNeighbours: true,
};

type CreateSlateData<TPlugins> = (
  custom?: CreateDataCustomizer<TPlugins>
) => SlateState;
export type SlatePlugin<TPlugins> = CellPlugin<
  SlateState,
  Omit<SlateState, 'selection'>
> & {
  createData: CreateSlateData<TPlugins>;
  createDataFromHtml: (html: string) => Promise<SlateState>;
  /**
   * @deprecated, use createData
   */
  createInitialSlateState: CreateSlateData<TPlugins>;
};
export type SlateCustomizeFunction<TPlugins extends SlatePluginCollection> = (
  def: DefaultSlateDefinition
) => SlateDefinition<TPlugins>;

function plugin<TPlugins extends SlatePluginCollection = DefaultPlugins>(
  customize?: SlateCustomizeFunction<TPlugins>
): SlatePlugin<TPlugins> {
  const settings = (customize
    ? customize(defaultConfig)
    : defaultConfig) as SlateDefinition<TPlugins>;

  const createData = (customizer: CreateDataCustomizer<TPlugins>) => {
    return transformInitialSlateState(
      customizer({ plugins: settings.plugins })
    );
  };

  const createInitialData = () =>
    createData(({ plugins }) => ({
      children: [
        {
          plugin: plugins.paragraphs.paragraph,
          children: [''],
        },
      ],
    }));

  // plugins should be flatten
  // NEW: to make it easier to manage and group plugins,
  // they now need to be an object of object with group and keys, see type SlatePluginCollection
  const plugins = makeSlatePluginsFromDef(settings.plugins);
  const htmlToSlate = HtmlToSlate({ plugins });

  return {
    Provider: (props) => (
      <SlateProvider
        {...props}
        plugins={plugins}
        translations={settings.translations}
        defaultPluginType={settings.defaultPluginType}
      />
    ),
    Renderer: (props) => (
      <SlateEditor
        {...props}
        plugins={plugins}
        translations={settings.translations}
        defaultPluginType={settings.defaultPluginType}
      />
    ),
    bottomToolbar: {
      dark: true,
    },
    controls: {
      type: 'custom',
      Component: (props) => (
        <Controls
          {...props}
          plugins={plugins}
          translations={settings.translations}
        />
      ),
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id: settings.id || (settings as any).name,
    version: settings.version,
    icon: settings.icon,
    title: settings.translations.pluginName,
    description: settings.translations.pluginDescription,
    hideInMenu: settings.hideInMenu,
    allowInlineNeighbours: settings.allowInlineNeighbours,
    allowClickInside: true,

    // disable default hotkeys
    handleRemoveHotKey: () => Promise.reject(),
    handleFocusPreviousHotKey: () => Promise.reject(),
    handleFocusNextHotKey: (e, node) => Promise.reject(),

    createInitialData,
    createInitialState: createInitialData,
    createInitialSlateState: createData,
    createData: createData,
    createDataFromHtml: htmlToSlate,
    // remove selection
    serialize: (s) => (s ? { slate: s.slate } : null),
    unserialize: (s) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((s as any)?.importFromHtml) {
        // this is no longer supported, but we do not delete it
        return {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          importFromHtml: (s as any).importFromHtml,
          ...s,
          ...createInitialData(),
        };
      }
      if (s?.slate) {
        return {
          slate: s.slate,
        };
      }

      return createInitialData();
    },

    migrations: settings.migrations,
  };
}

export default plugin;
