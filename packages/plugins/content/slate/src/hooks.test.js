/* eslint-env jest */
import * as hooks from './hooks'

import map from 'ramda/src/map'
import unexpected from 'unexpected'

const expect = unexpected.clone()

describe('hooks', () => {
  describe('merge', () => {
    it('does nothing if only one state is passed', () => {
      const expected = hooks.unserialize({
        importFromHtml:
          '<h1>European? British? These ‘Brexit’ Voters Identify as English</h1>'
      })
      const subject = hooks.merge([expected])

      expect(hooks.serialize(subject), 'to equal', hooks.serialize(expected))
    })

    it('merges the states if more than one state is passed', () => {
      const html = [
        '<h1>European? British? These ‘Brexit’ Voters Identify as English</h1>',
        '<p>Lorem ipsum dolor sit</p>'
      ]

      const subject = hooks.merge(
        map(importFromHtml => hooks.unserialize({ importFromHtml }), html)
      )

      const expected = hooks.unserialize({
        importFromHtml: html.join('')
      })

      expect(hooks.serialize(subject), 'to equal', hooks.serialize(expected))
    })
  })

  describe('split', () => {
    it('does nothing if the state contains only one block element', () => {
      const expected = hooks.unserialize({
        importFromHtml:
          '<h1>European? British? These ‘Brexit’ Voters Identify as English</h1>'
      })
      const subject = hooks.split(expected)

      expect(map(hooks.serialize, subject), 'to equal', [
        hooks.serialize(expected)
      ])
    })

    it('splits the state if it contains more than one block element', () => {
      const html = [
        '<h1>European? British? These ‘Brexit’ Voters Identify as English</h1>',
        '<p>Lorem ipsum dolor sit</p>'
      ]

      const editorState = hooks.unserialize({ importFromHtml: html.join('') })

      const [stateSplitA, stateSplitB] = hooks.split(editorState)

      expect(hooks.html.serialize(stateSplitA.editorState), 'to equal', html[0])

      expect(hooks.html.serialize(stateSplitB.editorState), 'to equal', html[1])
    })
  })
})
