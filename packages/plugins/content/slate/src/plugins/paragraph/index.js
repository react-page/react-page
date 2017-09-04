// @flow
/* eslint-disable prefer-reflect, default-case, react/display-name */
import React from 'react'
import Plugin from '../Plugin'
import Paragraph from './node'

export const P = 'PARAGRAPH/PARAGRAPH'

export default class ParagraphPlugin extends Plugin {
  name = 'paragraph'

  nodes = { [P]: Paragraph }

  deserialize = (el: any, next: any) => {
    switch (el.tagName.toLowerCase()) {
      case 'p':
        return {
          kind: 'block',
          type: P,
          nodes: next(el.childNodes)
          // data: Data.create({ textAlign: el.attr('styles')['text-align'] })
        }
    }
  }

  serialize = (
    object: { type: string, kind: string, data: any },
    children: any[]
  ) => {
    if (object.kind !== 'block') {
      return
    }
    switch (object.type) {
      case P:
        return <p style={{ textAlign: object.data.get('align') }}>{children}</p>
    }
  }
}
