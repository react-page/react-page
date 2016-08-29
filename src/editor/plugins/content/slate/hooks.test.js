/* eslint-env mocha */
import * as hooks from './hooks'

import { map } from 'ramda'
import unexpected from 'unexpected'

const expect = unexpected.clone()

describe('hooks', () => {
  describe('merge', () => {
    it('does nothing if only one state is passed', () => {
      const editorState = hooks.unserialize({ importFromHtml: '<h1>European? British? These ‘Brexit’ Voters Identify as English</h1>' })

      expect(hooks.merge([editorState]), 'to equal', editorState)
    })

    it('merges the states if more than one state is passed', () => {
      const html = [
        '<h1>European? British? These ‘Brexit’ Voters Identify as English</h1>',
        '<p>Lorem ipsum dolor sit</p>'
      ]

      const mergedEditorState = hooks.merge(
        map(
          (importFromHtml) => hooks.unserialize({ importFromHtml }),
          html
        )
      )

      const expectedState = hooks.unserialize({
        importFromHtml: html.join('')
      })

      expect(
        hooks.html.serialize(mergedEditorState.editorState),
        'to equal',
        hooks.html.serialize(expectedState.editorState)
      )
    })
  })

  describe('split', () => {
    it('does nothing if the state contains only one block element', () => {
      const editorState = hooks.unserialize({ importFromHtml: '<h1>European? British? These ‘Brexit’ Voters Identify as English</h1>' })

      expect(hooks.split(editorState), 'to equal', [editorState])
    })

    it('splits the state if it contains more than one block element', () => {
      const html = [
        '<h1>European? British? These ‘Brexit’ Voters Identify as English</h1>',
        '<p>Lorem ipsum dolor sit</p>'
      ]

      const editorState = hooks.unserialize(
        { importFromHtml: html.join('') }
      )

      const [stateSplitA, stateSplitB] = hooks.split(editorState)

      expect(
        hooks.html.serialize(stateSplitA.editorState),
        'to equal',
        html[0]
      )

      expect(
        hooks.html.serialize(stateSplitB.editorState),
        'to equal',
        html[1]
      )
    })
  })
})
