import { Editor, Element, Path, Text, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

type ListBaseDef = {
  allListTypes: string[];
  listItemType: string;
};

export const getActiveListType = (editor: Editor, allListTypes: string[]) => {
  const [matchingNode] = Editor.nodes(editor, {
    match: elem => allListTypes.includes(elem.type),
    mode: 'lowest', // FIXME: whats the best value?
  });
  return (matchingNode?.[0] as Element)?.type;
};

export const getPreviousListItem = (editor: Editor, listItemType: string) => {
  const [currentLi] = Editor.nodes(editor, {
    match: elem => elem.type === listItemType,
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
  const currentActiveType = getActiveListType(editor, def.allListTypes);

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
  editor: ReactEditor,
  nodePath: Path,
  targetPath: Path,
  parentIsList: boolean
) => {
  Transforms.moveNodes(editor, {
    at: nodePath,
    to: targetPath,
  });
  if (!parentIsList) {
    // is target node li with only text children?
    const targetNode = Editor.node(editor, targetPath);
    const onlyTextChildren = targetNode?.[0].children?.every(child =>
      Text.isText(child)
    );

    if (onlyTextChildren) {
      // set it to default node
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
      // unwrap instead
      Transforms.unwrapNodes(editor, {
        at: targetPath,
      });
    }
  }
};
export const decreaseListIndention = (
  editor: ReactEditor,
  def: ListBaseDef
) => {
  const [currentLi] = Editor.nodes(editor, {
    match: elem => elem.type === def.listItemType,
    mode: 'lowest',
  });
  const currentParent = Path.parent(currentLi[1]);
  const parentListItemPath = Path.parent(currentParent);
  const parentListItem = Editor.node(editor, parentListItemPath);
  const parentIsList = parentListItem?.[0].type === def.listItemType;

  const targetPath = parentIsList
    ? Path.next(parentListItemPath)
    : Path.next(currentParent);

  let next;
  do {
    next = Editor.next(editor, {
      at: currentLi[1],
    });
    if (next) {
      moveToParent(editor, next[1], targetPath, parentIsList);
    }
  } while (next);
  // is there only one left?
  const current = Editor.node(editor, currentParent);
  const willBeEmpty = (!current || current[0].children?.length <= 1) ?? true;

  moveToParent(editor, currentLi[1], targetPath, parentIsList);
  // is it now empty?
  if (willBeEmpty) {
    // unwrap it
    Transforms.unwrapNodes(editor, {
      at: Path.previous(currentParent),
    });
  }
};
