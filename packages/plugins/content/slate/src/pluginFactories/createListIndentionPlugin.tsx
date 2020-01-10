import { SlatePlugin } from 'src/types/SlatePlugin';

type Definition = {
  iconIncrease: JSX.Element;
  iconDecrease: JSX.Element;
  listItemType: string;
  listTypes: string[];
};

const ceateSlatePlugin = (def: Definition): SlatePlugin[] => {
  return [
    {
      pluginType: 'custom',
      addToolbarButton: true,
      addHoverButton: false,
      icon: def.iconIncrease,
      customAdd: editor => {
        // slateEditList.changes.increaseItemDepth(editor);
      },
      customRemove: editor => {
        // slateEditList.changes.decreaseItemDepth(editor);
      },
      isDisabled: editor => {
        // console.warn('need to reimplement slate list isDisabled ');
        return true;
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
        // slateEditList.changes.decreaseItemDepth(editor);
      },
      customRemove: editor => {
        // slateEditList.changes.increaseItemDepth(editor);
      },
      isDisabled: editor => {
        // console.warn('need to reimplement slate list isDisabled ');
        return true;
        /*
        const editorState = editor.value;
      
        const currentItem = slateEditList.utils.getCurrentItem(editorState);
        const itemDepth = slateEditList.utils.getItemDepth(editorState);

        const canDecrease = Boolean(itemDepth > 1 && currentItem);
        return !canDecrease;
        */
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
