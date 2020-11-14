import createPlugin from './createPlugin';

import Html5VideoHtmlRenderer from './Renderer/Html5VideoHtmlRenderer';

const plugin = createPlugin({
  Renderer: Html5VideoHtmlRenderer,
});

export default plugin;
