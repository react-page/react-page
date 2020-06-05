import { SlatePlugin } from '../types/SlatePlugin';
import {
  decreaseListIndention,
  getActiveListType,
  getPreviousListItem,
  increaseListIndention,
} from './utils/listUtils';

type Definition = {
  iconIncrease: JSX.Element;
  iconDecrease: JSX.Element;
  listItemType: string;
  allListTypes: string[];
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
      customAdd: (editor) => {
        increaseListIndention(editor, {
          allListTypes: def.allListTypes,
          listItemType: def.listItemType,
        });
      },
      customRemove: (editor) => {
        decreaseListIndention(editor, {
          allListTypes: def.allListTypes,
          listItemType: def.listItemType,
        });
      },
      isDisabled: (editor) => {
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
      customAdd: (editor) => {
        decreaseListIndention(editor, {
          allListTypes: def.allListTypes,
          listItemType: def.listItemType,
        });
      },
      customRemove: (editor) => {
        increaseListIndention(editor, {
          allListTypes: def.allListTypes,
          listItemType: def.listItemType,
        });
      },
      isDisabled: (editor) => {
        return !getActiveListType(editor, def.allListTypes);
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
