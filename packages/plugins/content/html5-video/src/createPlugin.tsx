import { CellPlugin } from '@react-page/editor';

import { defaultSettings } from './default/settings';
import Html5VideoHtmlRenderer from './Renderer/Html5VideoHtmlRenderer';

import { Html5VideoSettings } from './types/settings';
import { Html5VideoState } from './types/state';

const createPlugin: (
  settings: Html5VideoSettings
) => CellPlugin<Html5VideoState> = (settings) => {
  const mergedSettings = { ...defaultSettings, ...settings };

  return {
    Renderer: mergedSettings.Renderer ?? Html5VideoHtmlRenderer,
    controls: {
      columnCount: 1,
      type: 'autoform',
      schema: {
        required: ['url'],
        type: 'object',
        properties: {
          url: {
            type: 'string',
            uniforms: {
              placeholder: mergedSettings.translations.urlPlaceholder,
              label: mergedSettings.translations.urlLabel,
            },
          },
        },
      },
    },
    id: 'ory/sites/plugin/content/html5-video',
    version: 1,
    title: mergedSettings.translations.pluginName,
    description: mergedSettings.translations.pluginDescription,
    IconComponent: mergedSettings.IconComponent,
    isInlineable: mergedSettings.isInlineable,
    createInitialData: () => ({
      url: '',
    }),
  };
};

export default createPlugin;
