import createPlugin from './createPlugin';
import { lazyLoad } from '@react-page/core';

import Html5VideoHtmlRenderer from './Renderer/Html5VideoHtmlRenderer';

const Html5VideoDefaultControls = lazyLoad(() =>
  import('./Controls/Html5VideoDefaultControls')
);

const plugin = createPlugin({
  Renderer: Html5VideoHtmlRenderer,
  Controls: Html5VideoDefaultControls,
});

export default plugin;
