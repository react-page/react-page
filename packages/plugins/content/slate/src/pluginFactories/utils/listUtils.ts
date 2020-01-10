import { Editor, Element, Node, Path, Transforms } from 'slate';

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

export const decreaseListIndention = (
  editor: Editor,
  def: ListBaseDef,
  listType?: string
) => {
  const decreasedListType = getActiveListType(editor, def.allListTypes);

  Transforms.unwrapNodes(editor, {
    match: elem => elem.type === decreasedListType,
    split: false,
    mode: 'lowest',
  });

  const [currentLi] = Editor.nodes(editor, {
    match: elem => elem.type === def.listItemType,
    mode: 'lowest',
  });

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
