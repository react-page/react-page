import { SlatePluginCollection } from '../types/SlatePlugin';
import flattenDeep from './flattenDeep';

export default (plugins: SlatePluginCollection) => {
  return Object.keys(plugins).reduce((acc, groupKey) => {
    const group = plugins[groupKey];
    const groupPlugins = Object.keys(group).reduce((innerAcc, key) => {
      const pluginOrFactory = plugins[groupKey][key];
      // tslint:disable-next-line:no-any
      const result = (pluginOrFactory as any).toPlugin
        ? // tslint:disable-next-line:no-any
          (pluginOrFactory as any).toPlugin()
        : pluginOrFactory;

      return [...innerAcc, ...flattenDeep(result)];
    }, []);

    return [...acc, ...groupPlugins];
  }, []);
};
