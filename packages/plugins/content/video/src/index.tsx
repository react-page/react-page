import createPlugin from './createPlugin';

import { lazyLoad } from '@react-page/core';

import VideoHtmlRenderer from './Renderer/VideoHtmlRenderer';

const VideoDefaultControls = lazyLoad(() =>
  import('./Controls/VideoDefaultControls')
);

const plugin = createPlugin({
  Renderer: VideoHtmlRenderer,
  Controls: VideoDefaultControls,
});

export default plugin;
