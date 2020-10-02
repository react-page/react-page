import createPlugin from './createPlugin';
import DividerHtmlRenderer from './Renderer/DividerHtmlRenderer';

const plugin = createPlugin({
  Renderer: DividerHtmlRenderer,
  Controls: () => null,
});

export default plugin;
