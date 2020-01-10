import {
  Editor,
  Element,
  Node,
  NodeEntry,
  Path,
  Text,
  Transforms
} from 'slate';
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
  return Editor.previous(editor, {
    match: elem => elem.type === listItemType,
  });
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

const makeAllChildrenListItems = (
  editor: Editor,
  parent: NodeEntry<Node>,
  def: ListBaseDef
) => {
  const [...children] = Node.children(parent[0], []);
  console.log({ parent, children });
  children
    .filter(
      child => ![def.listItemType, ...def.allListTypes].includes(child[0].type)
    )
    .forEach(child => {
      Transforms.setNodes(
        editor,
        {
          type: def.listItemType,
        },
        {
          at: [...parent[1], ...child[1]],
        }
      );
    });
};

const sanitizeListItem = (editor: Editor, child: Path, def: ListBaseDef) => {
  const item = Editor.node(editor, child);
  // if it contains a
  console.log(item, Node.isNode(item[0]));
  if (!Text.isText(item[0])) {
    const [...children] = Node.children(item[0], []);
    console.log(children);
  }
};

const sanitizeList = (editor: Editor, listBasePath: Path, def: ListBaseDef) => {
  const [listBase] = Editor.node(editor, listBasePath);
  console.log('sanitizelist', listBase);

  const [...children] = Node.children(listBase, []);

  children.forEach(child =>
    sanitizeListItem(editor, [...listBasePath, ...child[1]], def)
  );

  //
};

const getLastLiAfterCurrent = (editor: Editor, path: Path) => {
  const parent = Editor.parent(editor, path);
  const lastOtherSibling = Node.last(parent[0], []);

  const lastSibling = Editor.last(editor, parent[1]);
  console.log({ lastSibling, lastOtherSibling, path, parent });
  return Path.isAfter(lastSibling[1], path) ? lastSibling : null;
};
export const decreaseListIndention = (
  editor: ReactEditor,
  def: ListBaseDef,
  listType?: string
) => {
  const decreasedListType = getActiveListType(editor, def.allListTypes);
  /*
  Transforms.unwrapNodes(editor, {
    match: elem => elem.type === decreasedListType,
    split: true,
    mode: 'lowest',
  });
  */
  const [currentLi] = Editor.nodes(editor, {
    match: elem => elem.type === def.listItemType,
    mode: 'lowest',
  });
  const currentList = Path.parent(currentLi[1]);
  const parentListItem = Path.parent(currentList);
  const parentList = Path.parent(parentListItem);

  let next;
  do {
    next = Editor.next(editor, {
      at: currentLi[1],
    });
    if (next) {
      Transforms.moveNodes(editor, {
        at: next[1],
        to: Path.next(parentListItem),
      });
    }
  } while (next);
  // is there only one left?
  const current = Editor.node(editor, currentList);
  const willBeEmpty = (!current || current[0].children?.length <= 1) ?? true;
  Transforms.moveNodes(editor, {
    at: currentLi[1],
    to: Path.next(parentListItem),
    voids: false,
  });
  // is it now empty?
  if (willBeEmpty) {
    // unwrap it
    Transforms.unwrapNodes(editor, {
      at: Path.previous(currentList),
    });

    /*Transforms.removeNodes(editor, {
      at: currentList,
    });
    */
  }

  return;

  // let lastSibling = Editor.last(editor, currentList);
  // const fromItemToEnd = Editor.range(editor, lastSibling[1]);
  let lastSibling;

  lastSibling = getLastLiAfterCurrent(editor, currentLi[1]);
  console.log({
    lastSibling,
  });

  if (lastSibling) {
    Transforms.moveNodes(editor, {
      at: lastSibling[1],
      to: parentListItem,
    });
  }
  lastSibling = getLastLiAfterCurrent(editor, currentLi[1]);
  console.log({
    lastSibling,
  });

  if (lastSibling) {
    Transforms.moveNodes(editor, {
      at: lastSibling[1],

      to: parentListItem,
    });
  }
  lastSibling = getLastLiAfterCurrent(editor, currentLi[1]);
  console.log({
    lastSibling,
  });

  if (lastSibling) {
    Transforms.moveNodes(editor, {
      at: lastSibling[1],

      to: parentListItem,
    });
  }
  return;
  do {
    lastSibling = getLastLiAfterCurrent(editor, currentLi[1]);
    console.log(currentLi, lastSibling);

    if (lastSibling) {
      Transforms.moveNodes(editor, {
        at: lastSibling[1],
        mode: 'lowest',
        match: elem => elem.type === def.listItemType,

        to: parentListItem,
      });
    }
  } while (lastSibling);

  return;

  Transforms.unwrapNodes(editor, {
    match: elem => elem.type === def.listItemType,
    split: true,
    mode: 'highest',
  });
  // sanitizeList(editor, parentList, def);

  return;

  const isLast = !Editor.next(editor, {
    at: currentLi[1],
  });
  const istFirst = !Editor.previous(editor, {
    at: currentLi[1],
  });
  // if its last, simply move it to the next list

  if (isLast) {
    Transforms.moveNodes(editor, {
      to: Path.next(parentList),
    });
  } else {
    Transforms.unwrapNodes(editor, {
      match: elem => elem.type === decreasedListType,
      split: true,
      mode: 'lowest',
    });
    makeAllChildrenListItems(editor, Editor.node(editor, parentListItem), def);
    Transforms.unwrapNodes(editor, {
      at: parentListItem,
      split: true,
    });
    return;
    // swap it with the  parent List item's content
    Transforms.moveNodes(editor, {
      to: parentListItem,
    });
    makeAllChildrenListItems(
      editor,
      Editor.node(editor, parentListItem),
      def.listItemType
    );
  }

  return;
  const parentLiPath = Path.parent(currentLi[1]);

  const parentLi = Editor.node(editor, parentLiPath);

  const [...children] = Node.children(parentLi[0], []);

  children
    .filter(child => child[0].type !== def.listItemType)
    .forEach(child => {
      Transforms.setNodes(
        editor,
        {
          type: def.listItemType,
        },
        {
          at: [...parentLi[1], ...child[1]],
        }
      );
    });

  Transforms.unwrapNodes(editor, {
    at: parentLi[1],
    split: false,
  });

  /*Transforms.unwrapNodes(editor, {
    match: elem => elem.type === null,
    split: true,
  });
  Transforms.wrapNodes(editor, {
    type: def.listItemType,
    children: [],
  });
  */
  // now we have a `<li> if its parent is still a <li> move it next to its parent
  /*
  let current;
  do {
    current = Editor.nodes(editor, {
      match: elem => elem.type === def.listItemType,
      mode: 'lowest',
    })[0];
    Transforms.unwrapNodes(editor, {
      match: elem => elem.type === def.listItemType,
      split: true,
    });
  } while (current);
  Transforms.wrapNodes(editor, {
    type: def.listItemType,
    children: [],
  });
  */

  // still a list active? --> handle <li> tags properly
  /*const stillActiveListType = getActiveListType(editor, def.allListTypes);
  if (stillActiveListType) {
    Transforms.unwrapNodes(editor, {
      match: elem => elem.type === def.listItemType,
      split: true,
      mode: 'highest',
    });
  }
  
  Transforms.setNodes(editor, {
    type: stillActiveListType ? def.listItemType : null,
  });
  */
};
