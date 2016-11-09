/* eslint-disable no-alert, prefer-reflect */
import LinkIcon from 'material-ui/svg-icons/content/link'
import React from 'react'

import { ToolbarButton } from '../../helpers'
import Plugin from '../Plugin'
import Link from './node'

const A = 'link/link'

const Button = ({ editorState, onChange }) => {
  const onClick = (e) => {
    e.preventDefault()

    const hasLinks = editorState.inlines.some((inline: any) => inline.type === A)

    let newState

    if (hasLinks) {
      newState = editorState
        .transform()
        .unwrapInline(A)
        .apply()
    } else if (editorState.isExpanded) {
      const href = window.prompt('Enter the URL of the link:')
      newState = editorState
        .transform()
        .wrapInline({
          type: A,
          data: { href }
        })
        .collapseToEnd()
        .apply()
    } else {
      const href = window.prompt('Enter the URL of the link:')
      const text = window.prompt('Enter the text for the link:')
      newState = editorState
        .transform()
        .insertText(text)
        .extendBackward(text.length)
        .wrapInline({
          type: A,
          data: { href }
        })
        .collapseToEnd()
        .apply()
    }

    onChange(newState)
  }

  const hasLinks = editorState.inlines.some((inline: any) => inline.type === A)

  return <ToolbarButton onClick={onClick} isActive={hasLinks} icon={<LinkIcon />} />
}

export default class LinkPlugin extends Plugin {
  name = 'link'

  nodes = { [A]: Link }

  hoverButtons = [Button]
  toolbarButtons = [Button]
}
