import { CellPlugin, lazyLoad } from '@react-page/editor';
import * as React from 'react';
import { defaultSettings } from './default/settings';

import { SpacerSettings } from './types/settings';
import { SpacerState } from './types/state';

const AspectRatio = lazyLoad(() => import('@material-ui/icons/AspectRatio'));
const createPlugin: (settings: SpacerSettings) => CellPlugin<SpacerState> = (
  settings
) => {
  const mergedSettings = { ...defaultSettings, ...settings };

  return {
    Renderer: mergedSettings.Renderer,
    controls: {
      type: 'autoform',
      columnCount: 1,
      schema: {
        required: ['height'],
        type: 'object',
        properties: {
          height: {
            type: 'number',
          },
        },
      },
    },
    id: 'ory/editor/core/content/spacer',
    version: 1,
    IconComponent: <AspectRatio />,
    title: mergedSettings.translations.pluginName,
    description: mergedSettings.translations.pluginDescription,

    createInitialData: () => ({
      height: 24,
    }),
  };
};

export default createPlugin;
