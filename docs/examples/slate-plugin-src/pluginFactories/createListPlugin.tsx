import type { CSSProperties } from 'react';
import { LI, LISTS_TYPE_PREFIX } from '../plugins/lists/constants';
import type { SlatePlugin } from '../types/SlatePlugin';
import type { SlateComponentPluginDefinition } from '../types/slatePluginDefinitions';
import createListItemPlugin from './createListItemPlugin';
import type { HtmlBlockData } from './createSimpleHtmlBlockPlugin';
import createSimpleHtmlBlockPlugin from './createSimpleHtmlBlockPlugin';

type ListDef = {
  type: string;
  icon?: JSX.Element;
  label?: string;
  hotKey?: string;
  tagName: keyof JSX.IntrinsicElements;
  noButton?: boolean; // for Li, this is automatically

  getStyle?: () => CSSProperties;
  listItem?: {
    type: string;
    tagName: keyof JSX.IntrinsicElements;
  };
};

type ListItemDef<T> = SlateComponentPluginDefinition<HtmlBlockData<T>>;

type CustomizeFunction<T, CT> = (def: ListItemDef<T>) => ListItemDef<CT & T>;

type ListCustomizers<T, CT> = {
  customizeList?: CustomizeFunction<T, CT>;
  customizeListItem?: CustomizeFunction<T, CT>;
};

function createSlatePlugins<T, CT>(
  def: ListDef,
  customizers: ListCustomizers<T, CT> = {}
) {
  const listItem = def.listItem ?? {
    tagName: 'li',
    type: LI,
  };
  return [
    createSimpleHtmlBlockPlugin<T>({
      type: def.type,
      icon: def.icon,
      label: def.label,
      noButton: def.noButton,
      tagName: def.tagName,
      getStyle: def.getStyle,

      customAdd: async (editor) => {
        const { getActiveList, increaseListIndention } = await import(
          './utils/listUtils'
        );
        const currentList = getActiveList(editor);

        if (!currentList) {
          increaseListIndention(
            editor,
            {
              listItemType: listItem.type,
            },
            def.type
          );
        } else {
          // change type
          const { Transforms } = await import('slate');
          Transforms.setNodes(
            editor,
            {
              type: def.type,
            },
            {
              at: currentList[1],
            }
          );
        }
      },
      customRemove: async (editor) => {
        const { decreaseListIndention } = await import('./utils/listUtils');
        decreaseListIndention(editor, {
          listItemType: listItem.type,
        });
      },
    })(customizers.customizeList),
    createListItemPlugin<T>(listItem)(customizers.customizeListItem),
  ];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mergeCustomizer(c1: any, c2: any): any {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customizeList(def: any) {
      const def2 = c1?.customizeList ? c1.customizeList(def) : def;
      return c2?.customizeList ? c2.customizeList(def2) : def2;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customizeListItem(def: any) {
      const def2 = c1?.customizeList ? c1.customizeListItem(def) : def;
      return c2?.customizeList ? c2.customizeListItem(def2) : def2;
    },
  };
}
// eslint-disable-next-line @typescript-eslint/ban-types
function createListPlugin<T = {}>(defRaw: ListDef) {
  const def: ListDef = {
    ...defRaw,
    type: LISTS_TYPE_PREFIX + defRaw.type,
    listItem: defRaw.listItem ?? {
      tagName: 'li',
      type: LI,
    },
  };
  const inner = function <TIn, TOut>(
    innerdef: ListDef,
    customizersIn?: ListCustomizers<TIn, TOut>
  ) {
    const customizablePlugin = function <CT>(
      customizers: ListCustomizers<TOut, CT>
    ) {
      return inner(innerdef, mergeCustomizer(customizersIn, customizers));
    };
    customizablePlugin.toPlugin = (): SlatePlugin[] =>
      createSlatePlugins<TIn, TOut>(innerdef, customizersIn).map((plugin) =>
        plugin.toPlugin()
      );
    return customizablePlugin;
  };

  return inner<T, T>(def);
}

export default createListPlugin;
