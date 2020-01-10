import { AbstractCell } from '@react-page/core/lib/types/editable';
// FIXME #126
// import Plain from 'slate-plain-serializer';

export const merge = (states: Object[]): Object => {
  /*const nodes = map(path(['editorState', 'document', 'nodes']), states);
  const mergedNodes = reduce(
    // tslint:disable-next-line:no-any
    (a: List<any>, b: List<any>) => a.concat(b),
    head(nodes),
    tail(nodes)
  );
  */
  console.warn('implement me merge');
  // const mergedDocument = Document.create({ nodes: mergedNodes });
  // const mergedEditorState = Value.create({ document: mergedDocument });

  /// return { editorState: mergedEditorState };
  return {};
};

export const split = (state: Object): Object[] => {
  console.warn('implement me split');
  return [];
  /*
  const nodes = path(['editorState', 'document', 'nodes'], state);
  return nodes
    ? nodes.toArray().map(node => {
        const splittedDocument = Document.create({ nodes: List([node]) });
        const splittedEditorState = Value.create({
          document: splittedDocument,
        });

        return { editorState: splittedEditorState };
      })
    : [];
    */
};

// if editor state is empty, remove cell when backspace or delete was pressed.
export const handleRemoveHotKey = (
  _: Event,
  {
    content: {
      state: { editorState },
    },
  }: AbstractCell<string>
): Promise<void> => {
  return Promise.reject();
  /*
  return new Promise<void>((resolve: Function, reject: Function) =>
    Plain.serialize(editorState).length < 1 ? resolve() : reject()
  )
  */
};

/*
const windowSelectionWaitTime = 1;

export const handleFocusPreviousHotKey = (
  e: KeyboardEvent,
  {
    content: {
      state: { editorState },
    },
  }: AbstractCell<string>
): Promise<void> => {
  // const isArrowUp = e.keyCode === 38

  return new Promise<void>((resolve: Function, reject: Function) => {
    if (editorState.selection.isExpanded) {
      return reject();
    }

    setTimeout(() => {
      // if (isArrowUp && next.top === current.top) {
      //   return resolve()
      // } else
      if (
        editorState.selection.isCollapsed &&
        editorState.selection.anchor.isAtStartOfNode(
          editorState.document.nodes.first()
        )
      ) {
        return resolve();
      }
      reject();
    }, windowSelectionWaitTime);
  });
};
*/
/*
export const handleFocusNextHotKey = (
  e: KeyboardEvent,
  {
    content: {
      state: { editorState },
    },
  }: AbstractCell<string>
): Promise<void> => {
  // const isArrowDown = e.keyCode === 40

  return new Promise<void>((resolve: Function, reject: Function) => {
    if (editorState.selection.isExpanded) {
      return reject();
    }

    setTimeout(() => {
      // if (isArrowDown && next.top === current.top) {
      //   return resolve()
      // } else
      if (
        editorState.selection.isCollapsed &&
        editorState.selection.anchor.isAtEndOfNode(
          editorState.document.nodes.last()
        )
      ) {
        return resolve();
      }
      reject();
    }, windowSelectionWaitTime);
  });
  
};
*/
