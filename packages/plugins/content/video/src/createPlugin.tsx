import { CellPlugin } from '@react-page/editor';

import { defaultSettings } from './default/settings';
import { VideoProps } from './types/component';
import { VideoSettings } from './types/settings';
import { VideoState } from './types/state';

const createPlugin: (settings: VideoSettings) => CellPlugin<VideoState> = (
  settings
) => {
  const mergedSettings = { ...defaultSettings, ...settings };

  return {
    controls: {
      type: 'autoform',

      schema: {
        required: ['src'],
        type: 'object',
        properties: {
          src: {
            type: 'string',
            uniforms: {
              placeholder: mergedSettings.translations.placeholder,
              label: mergedSettings.translations.label,
            },
          },
        },
      },
    },
    Renderer: mergedSettings.Renderer,
    id: 'ory/editor/core/content/video',
    version: 1,
    IconComponent: mergedSettings.IconComponent,
    title: mergedSettings.translations.pluginName,
    description: mergedSettings.translations.pluginDescription,
    isInlineable: true,
  };
};

export default createPlugin;
