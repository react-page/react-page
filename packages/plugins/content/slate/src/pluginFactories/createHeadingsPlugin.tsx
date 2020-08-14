import { SlateComponentPluginDefinition } from '../types/slatePluginDefinitions';
import createSimpleHtmlBlockPlugin, {
  HtmlBlockData,
} from './createSimpleHtmlBlockPlugin';

export type HeadingsDef<T> = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
} & Pick<
  SlateComponentPluginDefinition<HtmlBlockData<T>>,
  'type' | 'getInitialData' | 'icon'
>;
// eslint-disable-next-line @typescript-eslint/ban-types
function createHeadingsPlugin<T = {}>(def: HeadingsDef<T>) {
  return createSimpleHtmlBlockPlugin<T>({
    type: def.type,
    hotKey: 'mod+' + def.level,
    replaceWithDefaultOnRemove: true,
    icon: def.icon,
    label: `Heading ${def.level}`,
    tagName: ('h' + def.level) as keyof JSX.IntrinsicElements,
  });
}

export default createHeadingsPlugin;
