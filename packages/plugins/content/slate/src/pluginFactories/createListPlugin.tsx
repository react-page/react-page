import { CustomizeFunction } from './createComponentPlugin';
import createSlateEditList from '@guestbell/slate-edit-list';

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

function createListPlugin<T = {}>(def: ListDef) {
  const slateEditList = createSlateEditList({
    typeItem: def.listItem.type,
    types: [def.type],
  });

  return function<CT extends {}>(customizers?: {
    customizeList?: CustomizeFunction<HtmlBlockData<T>, HtmlBlockData<T & CT>>;
    customizeListItem?: CustomizeFunction<
      HtmlBlockData<T>,
      HtmlBlockData<T & CT>
    >;
  }) {
    return [
      createSimpleHtmlBlockPlugin<T>({
        type: def.type,
        icon: def.icon,
        noButton: def.noButton,
        tagName: def.tagName,

        customAdd: editor => slateEditList.changes.wrapInList(editor, def.type),
        customRemove: editor => slateEditList.changes.unwrapList(editor),
      })(customizers && customizers.customizeList),
      createListItemPlugin<T>(def.listItem)(
        customizers && customizers.customizeListItem
      ),
      {
        onKeyDown: (e: React.KeyboardEvent, editor, next) =>
          slateEditList.onKeyDown((e as unknown) as Event, editor, next),
      },
    ];
  };
}

export default createListPlugin;
