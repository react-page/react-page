import type { SlatePlugin } from '../types/SlatePlugin';

type Definition = {
  iconIncrease: JSX.Element;
  iconDecrease: JSX.Element;
  listItemType: string;
  labelIncrease?: string;
  labelDecrease?: string;
};

const ceateSlatePlugin = (def: Definition): SlatePlugin[] => {
  return [
    {
      pluginType: 'custom',
      addToolbarButton: true,
      addHoverButton: false,
      icon: def.iconIncrease,
      label: def.labelIncrease,
      customAdd: async (editor) => {
        const { increaseListIndention } = await import('./utils/listUtils');
        increaseListIndention(editor, {
          listItemType: def.listItemType,
        });
      },
      customRemove: async (editor) => {
        const { decreaseListIndention } = await import('./utils/listUtils');
        decreaseListIndention(editor, {
          listItemType: def.listItemType,
        });
      },
      isDisabled: async (editor) => {
        const { getPreviousListItem } = await import('./utils/listUtils');
        const previous = getPreviousListItem(editor, def.listItemType);
        return !previous;
      },
    },
    {
      pluginType: 'custom',
      addToolbarButton: true,
      addHoverButton: false,
      icon: def.iconDecrease,
      label: def.labelDecrease,
      customAdd: async (editor) => {
        const { decreaseListIndention } = await import('./utils/listUtils');
        decreaseListIndention(editor, {
          listItemType: def.listItemType,
        });
      },
      customRemove: async (editor) => {
        const { increaseListIndention } = await import('./utils/listUtils');
        increaseListIndention(editor, {
          listItemType: def.listItemType,
        });
      },
      isDisabled: async (editor) => {
        const { getActiveListType } = await import('./utils/listUtils');
        return !getActiveListType(editor);
      },
    },
  ];
};

function createListIndentionPlugin(def: Definition) {
  const customizablePlugin = function (
    customize: (def2: Definition) => Definition
  ) {
    return createListIndentionPlugin(customize(def));
  };
  customizablePlugin.toPlugin = (): SlatePlugin[] => ceateSlatePlugin(def);
  return customizablePlugin;
}

export default createListIndentionPlugin;
