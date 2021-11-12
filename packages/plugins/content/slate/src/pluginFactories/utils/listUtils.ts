import { Editor, Path, Text, Transforms } from 'slate';
import { LI, LISTS_TYPE_PREFIX } from '../../plugins/lists/constants';

/*
please load this file lazily, as it imports slate to avoid bloating read only mode
*/
type ListBaseDef = {
  listItemType: string;
};

export const getActiveList = (editor: Editor) => {
  const [matchingNode] = Editor.nodes(editor, {
    match: (elem) => {
      const type = elem.type as string;

      return type?.startsWith(LISTS_TYPE_PREFIX) && type !== LI;
    },
    mode: 'lowest',
  });
  return matchingNode;
};

export const getActiveListType = (editor: Editor) => {
  return getActiveList(editor)?.[0]?.type;
};

export const getPreviousListItem = (editor: Editor, listItemType: string) => {
  const [currentLi] = Editor.nodes(editor, {
    match: (elem) => elem.type === listItemType,
    mode: 'lowest',
  });

  const hasPrevious = currentLi && currentLi[1][currentLi[1].length - 1] > 0;
  return hasPrevious ? Editor.node(editor, Path.previous(currentLi[1])) : null;
};
export const increaseListIndention = (
  editor: Editor,
  def: ListBaseDef,
  listType?: string
) => {
  const currentActiveType = getActiveListType(editor);

  const previous = getPreviousListItem(editor, def.listItemType);

  Transforms.setNodes(editor, {
    type: def.listItemType,
  });

  if (previous) {
    // first make the previous node a paragraph
    Transforms.setNodes(
      editor,
      {
        type: null,
      },
      {
        at: previous[1],
      }
    );

    // wrap the pararaph as a new list item
    Transforms.wrapNodes(
      editor,
      {
        type: def.listItemType,
        children: [],
      },
      {
        at: previous[1],
      }
    );

    // move the current node after the paragraph
    Transforms.moveNodes(editor, {
      to: [...previous[1], 1],
    });
    Transforms.wrapNodes(editor, {
      type: listType ?? currentActiveType,
      children: [],
    });
  } else {
    Transforms.wrapNodes(editor, {
      type: listType ?? currentActiveType,
      children: [],
    });
  }
};

const moveToParent = (
  editor: Editor,
  nodePath: Path,
  targetPath: Path,
  parentIsList: boolean
) => {
  Transforms.moveNodes(editor, {
    at: nodePath,
    to: targetPath,
  });

  if (!parentIsList) {
    const targetNode = Editor.node(editor, targetPath);
    // see https://github.com/ianstormtaylor/slate/issues/3769
    const onlyTextChildren =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((targetNode?.[0] as any).children as Node[])?.every(
        (child) => Text.isText(child) || Editor.isInline(editor, child)
      );
    if (onlyTextChildren) {
      Transforms.setNodes(
        editor,
        {
          type: null,
        },
        {
          at: targetPath,
        }
      );
    } else {
      Transforms.unwrapNodes(editor, {
        at: targetPath,
      });
    }
  }
};
export const decreaseListIndention = (editor: Editor, def: ListBaseDef) => {
  const [currentLi] = Editor.nodes(editor, {
    match: (elem) => elem.type === def.listItemType,
    mode: 'lowest',
  });
  const currentLiPath = currentLi[1];
  const currentParent = Path.parent(currentLiPath);
  const parentListItemPath = Path.parent(currentParent);
  const parentListItem = Editor.node(editor, parentListItemPath);
  const parentIsList = parentListItem?.[0].type === def.listItemType;

  const isFirstInItsList = currentLiPath[currentLiPath.length - 1] === 0;

  const targetPath = parentIsList
    ? Path.next(parentListItemPath)
    : Path.next(currentParent);

  let next;
  do {
    next = Editor.next(editor, {
      at: currentLiPath,
    });

    if (next) {
      moveToParent(editor, next[1], targetPath, parentIsList);
    }
  } while (next);

  moveToParent(editor, currentLiPath, targetPath, parentIsList);

  if (isFirstInItsList) {
    // the list will be empty now, remove it

    Transforms.removeNodes(editor, {
      at: currentParent,
    });
    if (parentIsList) {
      const previousParagraphPath = [...Path.previous(targetPath), 0];
      const previousParagraph = Editor.node(editor, previousParagraphPath);

      if (!previousParagraph?.[0].type) {
        Transforms.unwrapNodes(editor, {
          at: previousParagraphPath,
          split: true,
        });
      }
    }
  }
};
