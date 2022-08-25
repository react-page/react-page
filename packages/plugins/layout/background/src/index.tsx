import type { BackgroundSettings } from './types/settings';
import createPlugin from './createPlugin';

import BackgroundHtmlRenderer from './Renderer/BackgroundHtmlRenderer';
import type { MakeOptional } from './types/makeOptional';
import { ModeEnum } from './types/ModeEnum';

export { ModeEnum };
import { lazy } from 'react';

const BackgroundDefaultControls = lazy(() => import('./Controls/Controls'));

export default (
  settings: MakeOptional<BackgroundSettings, 'Renderer' | 'Controls'>
) => {
  const plugin = createPlugin({
    Controls: BackgroundDefaultControls,
    Renderer: BackgroundHtmlRenderer,
    ...settings,
  });
  return plugin;
};
