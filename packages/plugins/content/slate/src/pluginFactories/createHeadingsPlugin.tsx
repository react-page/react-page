import DEFAULT_NODE from '../plugins/DEFAULT_NODE';

import createSimpleHtmlBlockPlugin, {
  HtmlBlockData
} from './createSimpleHtmlBlockPlugin';
import { SlateComponentPluginDefinition } from '../types/slatePluginDefinitions';

export type HeadingsDef<T> = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
} & Pick<
  SlateComponentPluginDefinition<HtmlBlockData<T>>,
  'type' | 'getInitialData' | 'icon'
>;

function createHeadingsPlugin<T = {}>(def: HeadingsDef<T>) {
  return createSimpleHtmlBlockPlugin<T>({
    type: def.type,
    hotKey: 'mod+' + def.level,
    replaceOnRemove: DEFAULT_NODE,
    icon: def.icon,
    tagName: 'h' + def.level,
  });
}

export default createHeadingsPlugin;
