import createPlugin from './createPlugin';
import DividerHtmlRenderer from './Renderer/DividerHtmlRenderer';

const plugin = createPlugin({
  Renderer: DividerHtmlRenderer,
});

export default plugin;
