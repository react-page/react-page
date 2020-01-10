import { SlatePlugin } from 'src/types/SlatePlugin';
import {
  decreaseListIndention,
  getActiveListType,
  getPreviousListItem,
  increaseListIndention
} from './utils/listUtils';

type Definition = {
  iconIncrease: JSX.Element;
  iconDecrease: JSX.Element;
  listItemType: string;
  allListTypes: string[];
};

const ceateSlatePlugin = (def: Definition): SlatePlugin[] => {
  return [
    {
      pluginType: 'custom',
      addToolbarButton: true,
      addHoverButton: false,
      icon: def.iconIncrease,
      customAdd: editor => {
        increaseListIndention(editor, {
          allListTypes: def.allListTypes,
          listItemType: def.listItemType,
        });
      },
      customRemove: editor => {
        decreaseListIndention(editor, {
          allListTypes: def.allListTypes,
          listItemType: def.listItemType,
        });
      },
      isDisabled: editor => {
        const previous = getPreviousListItem(editor, def.listItemType);
        return !previous;
        // console.warn('need to reimplement slate list isDisabled ');

        /*
        const editorState = editor.value;

        const previousItem = editorState
          ? slateEditList.utils.getPreviousItem(editorState)
          : null;
        const currentItem = editorState
          ? slateEditList.utils.getCurrentItem(editorState)
          : null;
        const canIncrease = Boolean(previousItem && currentItem);
        return !canIncrease;
        */
      },
    },
    {
      pluginType: 'custom',
      addToolbarButton: true,
      addHoverButton: false,
      icon: def.iconDecrease,
      customAdd: editor => {
        decreaseListIndention(editor, {
          allListTypes: def.allListTypes,
          listItemType: def.listItemType,
        });
      },
      customRemove: editor => {
        increaseListIndention(editor, {
          allListTypes: def.allListTypes,
          listItemType: def.listItemType,
        });
      },
      isDisabled: editor => {
        return !Boolean(getActiveListType(editor, def.allListTypes));
      },
    },
  ];
};

function createListIndentionPlugin(def: Definition) {
  const customizablePlugin = function(
    customize: (def2: Definition) => Definition
  ) {
    return createListIndentionPlugin(customize(def));
  };
  customizablePlugin.toPlugin = (): SlatePlugin[] => ceateSlatePlugin(def);
  return customizablePlugin;
}

export default createListIndentionPlugin;
