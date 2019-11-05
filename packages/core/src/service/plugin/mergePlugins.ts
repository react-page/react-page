import { PluginsInternal } from './classes';

export default (
  pluginsToMergeIn: PluginsInternal,
  plugins: PluginsInternal
) => {
  if (pluginsToMergeIn.layout) {
    plugins.layout = [...pluginsToMergeIn.layout, ...plugins.layout];
  }
  if (pluginsToMergeIn.content) {
    plugins.content = [...pluginsToMergeIn.content, ...plugins.content];
  }
  return plugins;
};
