import createSlateEditList from '@guestbell/slate-edit-list';
import { SlatePlugin } from 'src/types/SlatePlugin';
import { SlateComponentPluginDefinition } from '../types/slatePluginDefinitions';
import createListItemPlugin from './createListItemPlugin';
import createSimpleHtmlBlockPlugin, {
  HtmlBlockData
} from './createSimpleHtmlBlockPlugin';

type ListDef = {
  type: string;
  icon?: JSX.Element;
  hotKey?: string;
  tagName: string;
  noButton?: boolean; // for Li, this is automatically
  listItem: {
    type: string;
    tagName: string;
    defaultNode: string;
  };
};

type ListItemDef<T> = SlateComponentPluginDefinition<HtmlBlockData<T>>;

type CustomizeFunction<T> = <CT>(def: ListItemDef<T>) => ListItemDef<CT>;

type ListCustomizers<T> = {
  customizeList?: CustomizeFunction<T>;
  customizeListItem?: CustomizeFunction<T>;
};

function createSlatePlugins<T>(
  def: ListDef,
  customizers: ListCustomizers<T> = {}
) {
  const slateEditList = createSlateEditList({
    typeItem: def.listItem.type,
    types: [def.type],
  });
  return [
    createSimpleHtmlBlockPlugin<T>({
      type: def.type,
      icon: def.icon,
      noButton: def.noButton,
      tagName: def.tagName,

      customAdd: editor => slateEditList.changes.wrapInList(editor, def.type),
      customRemove: editor => slateEditList.changes.unwrapList(editor),
    })(customizers.customizeList),
    createListItemPlugin<T>(def.listItem)(customizers.customizeListItem),
  ];
}

function mergeCustomizer<TIn, TMiddle>(
  c1: ListCustomizers<TIn>,
  c2: ListCustomizers<TMiddle>
): ListCustomizers<TIn> {
  return {
    customizeList<CT>(def: ListItemDef<TIn>) {
      const def2 = c1.customizeList
        ? c1.customizeList<TMiddle>(def)
        : ((def as unknown) as ListItemDef<TMiddle>);
      return c2.customizeList
        ? c2.customizeList<CT>(def2)
        : ((def2 as unknown) as ListItemDef<CT>);
    },
    customizeListItem<CT>(def: ListItemDef<TIn>) {
      const def2 = c1.customizeList
        ? c1.customizeListItem<TMiddle>(def)
        : ((def as unknown) as ListItemDef<TMiddle>);
      return c2.customizeList
        ? c2.customizeListItem<CT>(def2)
        : ((def2 as unknown) as ListItemDef<CT>);
    },
  };
}

function createListPlugin<T = {}>(def: ListDef) {
  const inner = function<TIn>(
    innerdef: ListDef,
    customizersIn?: ListCustomizers<TIn>
  ) {
    const customizablePlugin = function(customizers: ListCustomizers<TIn>) {
      return inner(innerdef, mergeCustomizer(customizersIn, customizers));
    };
    customizablePlugin.toPlugin = (): SlatePlugin[] =>
      createSlatePlugins<TIn>(innerdef, customizersIn).map(plugin =>
        plugin.toPlugin()
      );
    return customizablePlugin;
  };

  return inner<T>(def);
}

export default createListPlugin;
