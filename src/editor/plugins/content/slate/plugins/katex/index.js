/* eslint-disable no-alert, prefer-reflect */
import KatexIcon from 'material-ui/svg-icons/editor/functions'
import React from 'react'

import { ToolbarButton } from '../../helpers'
import Plugin from '../Plugin'
import Katex from './node'

const KATEX = 'katex/katex'

export default class LinkPlugin extends Plugin {
  constructor(props) {
    super(props)

    this.DEFAULT_NODE = props.DEFAULT_NODE
  }

  Button = ({ editorState, onChange }) => {
    const onClick = (e) => {
      e.preventDefault()

      const hasMath = editorState.blocks.some((block) => block.type === KATEX)

      let newState

      if (hasMath) {
        newState = editorState
          .transform()
          .setBlock(this.DEFAULT_NODE)
          .apply()
      } else {
        const src = window.prompt('Enter the src of the formula:')

        newState = editorState
          .transform()
          .splitBlock()
          .setBlock({
            type: KATEX,
            data: { src }
          })
          .apply()
      }

      onChange(newState)
    }

    const hasMath = editorState.blocks.some((block) => block.type === KATEX)

    return <ToolbarButton onClick={onClick} isActive={hasMath} icon={<KatexIcon />} />
  }

  name = 'katex'

  nodes = { [KATEX]: Katex }

  toolbarButtons = [this.Button]
}
