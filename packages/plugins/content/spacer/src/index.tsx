import createPlugin from './createPlugin';

import SpacerHtmlRenderer from './Renderer/SpacerHtmlRenderer';
import { lazyLoad } from '@react-page/core';

const SpacerDefaultControls = lazyLoad(() =>
  import('./Controls/SpacerDefaultControls')
);

const plugin = createPlugin({
  Renderer: SpacerHtmlRenderer,
  Controls: SpacerDefaultControls,
});

export default plugin;
