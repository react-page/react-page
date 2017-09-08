// @flow
// FIXME #125: missing types for slate internals
/* eslint-disable new-cap, arrow-body-style, react/display-name */
import { List } from 'immutable'
import head from 'ramda/src/head'
import map from 'ramda/src/map'
import path from 'ramda/src/path'
import reduce from 'ramda/src/reduce'
import tail from 'ramda/src/tail'
import React from 'react'
import type { Props } from './Component'
import AlignmentPlugin from './plugins/alignment'
import BlockquotePlugin from './plugins/blockquote'
import CodePlugin from './plugins/code'
import EmphasizePlugin from './plugins/emphasize'
import HeadingsPlugin from './plugins/headings'
import LinkPlugin from './plugins/link'
import ListsPlugin from './plugins/lists'
import ParagraphPlugin, { P } from './plugins/paragraph'
import parse5 from 'parse5'

// FIXME #126
import { Document, Html, Raw, State, Plain } from 'slate'

const DEFAULT_NODE = P

export const defaultPlugins = [
  new ParagraphPlugin(),
  new EmphasizePlugin(),
  new HeadingsPlugin({ DEFAULT_NODE }),
  new LinkPlugin(),
  new CodePlugin({ DEFAULT_NODE }),
  new ListsPlugin({ DEFAULT_NODE }),
  new BlockquotePlugin({ DEFAULT_NODE }),
  new AlignmentPlugin()
  // new KatexPlugin({ DEFAULT_NODE })
]

export const lineBreakSerializer = {
  deserialize(el: any) {
    if (el.tagName.toLowerCase() === 'br') {
      return { kind: 'text', text: '\n' }
    }
  },
  serialize(object: any, children: any) {
    if (object.type === 'text' || children === '\n') {
      return <br />
    }
  }
}

export const html = new Html({
  rules: [...defaultPlugins, lineBreakSerializer],
  parseHtml: parse5.parseFragment
})

const options = { terse: true }

export const createInitialState = () => ({
  editorState: Raw.deserialize(
    {
      nodes: [
        {
          kind: 'block',
          type: P,
          nodes: [
            {
              kind: 'text',
              text: ''
            }
          ]
        }
      ]
    },
    options
  )
})

export const unserialize = ({
  importFromHtml,
  serialized,
  editorState
}: {
  importFromHtml: string,
  serialized: Object,
  editorState: Object
}): { editorState: Object } => {
  if (serialized) {
    return { editorState: Raw.deserialize(serialized, options) }
  } else if (importFromHtml) {
    return { editorState: html.deserialize(importFromHtml, options) }
  } else if (editorState) {
    return { editorState }
  }

  return createInitialState()
}

export const serialize = ({ editorState }: any) => ({
  serialized: Raw.serialize(editorState, options)
})

export const merge = (states: Object[]): Object => {
  const nodes = map(path(['editorState', 'document', 'nodes']), states)
  const mergedNodes = reduce(
    (a: List<any>, b: List<any>) => a.concat(b),
    head(nodes),
    tail(nodes)
  )
  const mergedDocument = Document.create({ nodes: mergedNodes })
  const mergedEditorState = State.create({ document: mergedDocument })

  return { editorState: mergedEditorState }
}

export const split = (state: Object): Object[] => {
  const nodes = path(['editorState', 'document', 'nodes'], state)

  return nodes
    .map((node: any) => {
      const splittedDocument = Document.create({ nodes: List([node]) })
      const splittedEditorState = State.create({ document: splittedDocument })

      return { editorState: splittedEditorState }
    })
    .toArray()
}

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
  _: KeyboardEvent,
  { content: { state: { editorState } } }: Props
) =>
  new Promise(
    (resolve: Function, reject: Function) =>
      Plain.serialize(editorState).length < 1 ? resolve() : reject()
  )

const windowSelectionWaitTime = 1

export const handleFocusPreviousHotKey = (
  e: KeyboardEvent,
  { content: { state: { editorState } } }: Props
) => {
  // const isArrowUp = e.keyCode === 38

  return new Promise((resolve: Function, reject: Function) => {
    if (editorState.isExpanded) {
      return reject()
    }

    setTimeout(() => {
      // if (isArrowUp && next.top === current.top) {
      //   return resolve()
      // } else
      if (
        editorState.selection.isAtStartOf(editorState.document.nodes.first())
      ) {
        return resolve()
      }
      reject()
    }, windowSelectionWaitTime)
  })
}

export const handleFocusNextHotKey = (
  e: KeyboardEvent,
  { content: { state: { editorState } } }: Props
) => {
  // const isArrowDown = e.keyCode === 40

  return new Promise((resolve: Function, reject: Function) => {
    if (editorState.isExpanded) {
      return reject()
    }

    setTimeout(() => {
      // if (isArrowDown && next.top === current.top) {
      //   return resolve()
      // } else
      if (editorState.selection.isAtEndOf(editorState.document.nodes.last())) {
        return resolve()
      }
      reject()
    }, windowSelectionWaitTime)
  })
}
