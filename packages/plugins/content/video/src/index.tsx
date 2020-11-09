import createPlugin from './createPlugin';

import VideoHtmlRenderer from './Renderer/VideoHtmlRenderer';

const plugin = createPlugin({
  Renderer: VideoHtmlRenderer,
});

export default plugin;
