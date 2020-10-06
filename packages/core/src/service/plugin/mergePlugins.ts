import { Plugins } from './classes';

export default (pluginsToMergeIn: Plugins, plugins: Plugins) => {
  if (pluginsToMergeIn.layout) {
    plugins.layout = [...pluginsToMergeIn.layout, ...plugins.layout];
  }
  if (pluginsToMergeIn.content) {
    plugins.content = [...pluginsToMergeIn.content, ...plugins.content];
  }
  return plugins;
};
