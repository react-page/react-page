import { Editor, Transforms } from 'slate';
import { SlatePlugin } from 'src/types/SlatePlugin';
import { SlateComponentPluginDefinition } from '../types/slatePluginDefinitions';
import createListItemPlugin from './createListItemPlugin';
import createSimpleHtmlBlockPlugin, {
  HtmlBlockData
} from './createSimpleHtmlBlockPlugin';

type ListDef = {
  type: string;
  allListTypes: string[];
  icon?: JSX.Element;
  hotKey?: string;
  tagName: string;
  noButton?: boolean; // for Li, this is automatically
  listItem: {
    type: string;
    tagName: string;
  };
};

type ListItemDef<T> = SlateComponentPluginDefinition<HtmlBlockData<T>>;

type CustomizeFunction<T> = <CT>(def: ListItemDef<T>) => ListItemDef<CT>;

type ListCustomizers<T> = {
  customizeList?: CustomizeFunction<T>;
  customizeListItem?: CustomizeFunction<T>;
};

const anyListIsActive = (editor: Editor, def: ListDef) => {
  const [matchingNode] = Editor.nodes(editor, {
    match: elem => def.allListTypes.includes(elem.type),
    mode: 'lowest', // FIXME: whats the best value?
  });
  return Boolean(matchingNode);
};

function createSlatePlugins<T>(
  def: ListDef,
  customizers: ListCustomizers<T> = {}
) {
  return [
    createSimpleHtmlBlockPlugin<T>({
      type: def.type,
      icon: def.icon,
      noButton: def.noButton,
      tagName: def.tagName,

      customAdd: editor => {
        console.log(def);
        const listIsActive = anyListIsActive(editor, def);
        console.log({ listIsActive });

        Transforms.wrapNodes(editor, {
          type: def.type,
          children: [],
        });
        Transforms.wrapNodes(editor, {
          type: def.listItem.type,
          children: [],
        });
      },
      customRemove: editor => {
        Transforms.unwrapNodes(editor, {
          match: elem => elem.type === def.listItem.type,
        });
        Transforms.unwrapNodes(editor, {
          match: elem => elem.type === def.type,
          split: true,
        });
        const listIsActive = anyListIsActive(editor, def);
        console.log({ listIsActive });
      },
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
