// @flow
// FIXME #125: missing types for slate internals
/* eslint-disable react/display-name */
/* eslint-disable new-cap */
import { List } from 'immutable'
import { head, map, path, reduce, tail } from 'ramda'
import React from 'react'
// FIXME #126
// flow-disable-next-line named exports
import { Document, Html, Raw, State } from 'slate'

const rules = [{
  deserialize: (el: any) => el.tagName === 'p' ? {
    kind: 'block',
    type: 'paragraph',
    nodes: [{ kind: 'text', ranges: [{ text: el.children[0].data }] }]
  } : null
}, {
  deserialize: (el: any) => el.tagName === 'h1' ? {
    kind: 'block',
    type: 'heading-one',
    nodes: [{ kind: 'text', ranges: [{ text: el.children[0].data }] }]
  } : null
}, {
  deserialize: (el: any) => el.tagName === 'h2' ? {
    kind: 'block',
    type: 'heading-two',
    nodes: [{ kind: 'text', ranges: [{ text: el.children[0].data }] }]
  } : null
}, {
  deserialize: (el: any) => el.tagName === 'h3' ? {
    kind: 'block',
    type: 'heading-three',
    nodes: [{ kind: 'text', ranges: [{ text: el.children[0].data }] }]
  } : null
}, {
  serialize: (el: any, children: any) => el.type === 'heading-one'
    ? <h1>{children}</h1>
    : null
}, {
  serialize: (el: any, children: any) => el.type === 'paragraph'
    ? <p>{children}</p>
    : null
}]

export const html = new Html({ rules })

const options = { terse: true }

export const createInitialState = () => ({
  editorState: Raw.deserialize({
    nodes: [{
      kind: 'block',
      type: 'paragraph',
      nodes: [{
        kind: 'text',
        ranges: [{ text: '' }]
      }]
    }]
  }, options)
})

export const unserialize = ({ importFromHtml, serialized }: { importFromHtml: string, serialized: Object }): { editorState: Object } => {
  if (serialized) {
    return { editorState: Raw.deserialize(serialized, options) }
  } else if (importFromHtml) {
    return { editorState: html.deserialize(importFromHtml, options) }
  }

  return createInitialState()
}

export const serialize = ({ editorState }: any) => ({
  serialized: Raw.serialize(editorState, options)
})

export const merge = (states: Object[]): Object => {
  const nodes = map(path(['editorState', 'document', 'nodes']), states)
  const mergedNodes = reduce((a: List<any>, b: List<any>) => a.concat(b), head(nodes), tail(nodes))
  const mergedDocument = Document.create({ nodes: mergedNodes })
  const mergedEditorState = State.create({ document: mergedDocument })

  return { editorState: mergedEditorState }
}

export const split = (state: Object): Object[] => {
  const nodes = path(['editorState', 'document', 'nodes'], state)

  return nodes.map(
    (node: any) => {
      const splittedDocument = Document.create({ nodes: List([node]) })
      const splittedEditorState = State.create({ document: splittedDocument })

      return { editorState: splittedEditorState }
    }
  ).toArray()
}
