import createPlugin from './createPlugin';

import SpacerHtmlRenderer from './Renderer/SpacerHtmlRenderer';

const plugin = createPlugin({
  Renderer: SpacerHtmlRenderer,
});

export default plugin;
