/* eslint-disable prefer-reflect, default-case, react/display-name */
import React from 'react'
import CodeIcon from 'material-ui/svg-icons/action/code'
import { Data } from 'slate'
import { makeTagMark, ToolbarButton } from '../../helpers'
import Plugin from '../Plugin'
import Code from './node'
import type { Props } from '../props'

export const CODE = 'CODE/CODE'

export default class CodePlugin extends Plugin {
  constructor(props: Props) {
    super(props)

    this.DEFAULT_NODE = props.DEFAULT_NODE
  }

  props: Props

  createButton = (type, icon) => {
    const Button = ({ editorState, onChange }: Props) => {
      const onClick = e => {
        e.preventDefault()

        onChange(
          editorState
            .transform()
            .toggleMark(type)
            .apply()
        )
      }

      const isActive =
        editorState && editorState.marks.some(mark => mark.type === type)

      return <ToolbarButton onClick={onClick} isActive={isActive} icon={icon} />
    }

    return Button
  }

  createNodeButton = (type, icon) => {
    const Button = ({ editorState, onChange }: Props) => {
      const onClick = e => {
        e.preventDefault()

        const isActive = editorState.blocks.some(block => block.type === type)

        onChange(
          editorState
            .transform()
            .setBlock(isActive ? this.DEFAULT_NODE : type)
            .apply()
        )
      }

      const isActive = editorState.blocks.some(block => block.type === type)

      return <ToolbarButton onClick={onClick} isActive={isActive} icon={icon} />
    }

    return Button
  }

  name = 'code'

  marks = { [CODE]: makeTagMark('code') }
  nodes = { [CODE]: Code }

  hoverButtons = [this.createButton(CODE, <CodeIcon />)]
  toolbarButtons = [this.createNodeButton(CODE, <CodeIcon />)]

  deserialize = (el, next) => {
    switch (el.tagName.toLowerCase()) {
      case 'code':
        return {
          kind: 'mark',
          type: CODE,
          data: Data.create({}),
          nodes: next(el.childNodes)
        }
      case 'pre':
        return {
          kind: 'block',
          type: CODE,
          nodes: next(el.childNodes)
        }
    }
  }

  serialize = (
    object: { type: string, kind: string, data: any },
    children: any[]
  ) => {
    if (object.kind === 'mark') {
      switch (object.type) {
        case CODE:
          return <code>{children}</code>
      }
    } else if (object.kind === 'block') {
      switch (object.type) {
        case CODE:
          return (
            <pre style={{ overflow: 'scroll' }}>
              <code>{children}</code>
            </pre>
          )
      }
    }
  }
}
