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

/* eslint-disable no-alert, prefer-reflect, default-case, react/display-name */
import LinkIcon from 'material-ui/svg-icons/content/link'
import React, { Component } from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import { ToolbarButton } from '../../helpers'
import Plugin from '../Plugin'
import Link from './node'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { Data } from 'slate'
import type { Props } from '../props'

export const A = 'LINK/LINK'

class Button extends Component {
  state = {
    open: false,
    href: '',
    title: '',
    hadLinks: false
  }

  props: Props

  input: Component<*, *, *>

  onRef = (component: Component<*, *, *>) => {
    if (!component && true) {
      return null
    }

    const e = component.querySelector('input')
    if (e) {
      e.focus()
    }
  }

  onClick = e => {
    const { editorState, onChange } = this.props
    e.preventDefault()

    const hasLinks = editorState.inlines.some(
      (inline: any) => inline.type === A
    )

    if (hasLinks) {
      const newState = editorState
        .transform()
        .unwrapInline(A)
        .apply()
      onChange(newState)
    } else if (editorState.isExpanded) {
      this.setState({
        open: true,
        wasExpanded: editorState.isExpanded,
        href: '',
        title: '',
        hadLinks: hasLinks
      })
    } else {
      this.setState({
        open: true,
        wasExpanded: editorState.isExpanded,
        href: '',
        title: '',
        hadLinks: hasLinks
      })
    }
  }

  handleClose = () => {
    this.setState({ open: false })

    const newState = this.props.editorState
      .transform()
      .focus()
      .apply()
    window.setTimeout(() => this.props.onChange(newState), 1)
  }

  handleSubmit = () => {
    this.setState({ open: false })

    if (!this.state.href) {
      this.handleClose()
      return
    }

    if (this.state.wasExpanded) {
      const newState = this.props.editorState
        .transform()
        .focus()
        .apply()
        .transform()
        .wrapInline({
          type: A,
          data: { href: this.state.href }
        })
        .collapseToEnd()
        .apply()

      window.setTimeout(() => this.props.onChange(newState), 1)
      window.setTimeout(() => this.props.focus(), 100)
      return
    }

    if (!this.state.title) {
      this.handleClose()
      return
    }

    const newState = this.props.editorState
      .transform()
      .insertText(this.state.title)
      .extend(-this.state.title.length)
      .wrapInline({
        type: A,
        data: { href: this.state.href }
      })
      .collapseToEnd()
      .focus()
      .apply()

    this.props.onChange(newState)
    window.setTimeout(() => this.props.focus(), 100)
  }

  onHrefChange = e => {
    this.setState({ href: e.target.value })
  }

  onTitleChange = e => {
    this.setState({ title: e.target.value })
  }

  render() {
    const actions = [
      <FlatButton
        key="0"
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        key="1"
        label="Submit"
        primary
        onTouchTap={this.handleSubmit}
      />
    ]
    const { editorState } = this.props

    const hasLinks = editorState.inlines.some(
      (inline: any) => inline.type === A
    )
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <span>
          <ToolbarButton
            onClick={this.onClick}
            isActive={hasLinks}
            icon={<LinkIcon />}
          />
          <span>
            <Dialog
              className="ory-prevent-blur"
              title="Create a link"
              modal={false}
              open={this.state.open}
              actions={[actions]}
            >
              {this.state.wasExpanded ? null : (
                <div>
                  <TextField
                    hintText="Link title"
                    onChange={this.onTitleChange}
                    value={this.state.title}
                  />
                </div>
              )}
              <div ref={this.onRef}>
                <TextField
                  hintText="http://example.com/my/link.html"
                  onChange={this.onHrefChange}
                  value={this.state.href}
                />
              </div>
            </Dialog>
          </span>
        </span>
      </MuiThemeProvider>
    )
  }
}

export default class LinkPlugin extends Plugin {
  name = 'link'

  nodes = { [A]: Link }

  hoverButtons = [Button]
  toolbarButtons = [Button]

  deserialize = (el, next) => {
    switch (el.tagName.toLowerCase()) {
      case 'a':
        return {
          kind: 'inline',
          type: A,
          nodes: next(el.childNodes),
          data: Data.create({
            href: (el.attrs.find(({ name }) => name === 'href') || {
              value: ''
            }).value
          })
        }
    }
  }

  serialize = (
    object: { type: string, kind: string, data: any },
    children: any[]
  ) => {
    if (object.kind !== 'inline') {
      return
    }
    switch (object.type) {
      case A:
        return <a href={object.data.get('href')}>{children}</a>
    }
  }
}
