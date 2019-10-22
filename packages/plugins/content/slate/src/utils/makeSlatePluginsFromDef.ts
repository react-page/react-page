import { SlatePluginCollection } from '../types/SlatePlugin';
import flattenDeep from './flattenDeep';

export default (plugins: SlatePluginCollection) => {
  return Object.keys(plugins).reduce((acc, groupKey) => {
    const group = plugins[groupKey];
    const groupPlugins = Object.keys(group).reduce((innerAcc, key) => {
      const pluginOrFactory = plugins[groupKey][key];
      const result =
        typeof pluginOrFactory === 'function'
          ? pluginOrFactory()
          : pluginOrFactory;

      return [...innerAcc, ...flattenDeep(result)];
    }, []);

    return [...acc, ...groupPlugins];
  }, []);
};
