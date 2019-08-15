/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

import { List } from 'immutable';
import head from 'ramda/src/head';
import map from 'ramda/src/map';
import path from 'ramda/src/path';
import reduce from 'ramda/src/reduce';
import tail from 'ramda/src/tail';

// FIXME #126
import { Document, Value } from 'slate';

import Plain from 'slate-plain-serializer';

import { AbstractCell } from '@react-page/core/lib/types/editable';

export const merge = (states: Object[]): Object => {
  const nodes = map(path(['editorState', 'document', 'nodes']), states);
  const mergedNodes = reduce(
    // tslint:disable-next-line:no-any
    (a: List<any>, b: List<any>) => a.concat(b),
    head(nodes),
    tail(nodes)
  );
  const mergedDocument = Document.create({ nodes: mergedNodes });
  const mergedEditorState = Value.create({ document: mergedDocument });

  return { editorState: mergedEditorState };
};

export const split = (state: Object): Object[] => {
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
};

// const position = (): {
//   top: ?number,
//   right: ?number,
//   left: ?number,
//   bottom: ?number
// } => {
//   if (window && window.getSelection) {
//     const selection = window.getSelection()
//     if (!selection.rangeCount) {
//       return {
//         top: null,
//         right: null,
//         left: null,
//         bottom: null,
//       }
//     }
//
//     return selection.getRangeAt(0).getBoundingClientRect()
//   }
//
//   if (window.document.selection) {
//     return window.document.selection
//       .createRange()
//       .getBoundingClientRect()
//   }
//
//   return {
//     top: null,
//     right: null,
//     left: null,
//     bottom: null,
//   }
// }

// if editor state is empty, remove cell when backspace or delete was pressed.
export const handleRemoveHotKey = (
  _: Event,
  {
    content: {
      state: { editorState },
    },
  }: AbstractCell<string>
): Promise<void> =>
  new Promise<void>((resolve: Function, reject: Function) =>
    Plain.serialize(editorState).length < 1 ? resolve() : reject()
  );

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
