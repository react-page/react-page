import React, { Component, PropTypes } from 'react'
import {
  convertFromRaw,
  convertToRaw,
  ContentState,
  Editor as DraftEditor,
  EditorState,
  getDefaultKeyBinding,
  KeyBindingUtil,
  RichUtils
} from 'draft-js'

import 'draft-js/dist/Draft.css'

class Editor extends Component {
  constructor(props) {
    super(props)

    const rawContent = props.storage.get()

    let editorState

    try {
      const blocks = convertFromRaw(rawContent)
      const content = ContentState.createFromBlockArray(blocks)

      editorState = EditorState.createWithContent(content)
    } catch (e) {
      editorState = EditorState.createEmpty()
    } finally {
      this.state = { editorState }
    }

    this.handleKeyCommand = this.handleKeyCommand.bind(this)
    this.keyBindingFn = this.keyBindingFn.bind(this)
    this.onChange = (editorState) => this.setState({ editorState })
  }

  handleKeyCommand(command) {
    switch (command) {
      case 'editor-save': {
        const { storage } = this.props
        const { editorState } = this.state

        storage.set(convertToRaw(editorState.getCurrentContent()))

        return true
      }
      default: {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command)

        if (newState) {
          this.onChange(newState)
          return true
        }
      }
    }

    return false
  }

  keyBindingFn(e) {
    if (e.keyCode === 83 && KeyBindingUtil.hasCommandModifier(e)) {
      return 'editor-save'
    }

    return getDefaultKeyBinding(e)
  }

  render() {
    return (
      <DraftEditor editorState={this.state.editorState}
                   handleKeyCommand={this.handleKeyCommand}
                   keyBindingFn={this.keyBindingFn}
                   onChange={this.onChange}
                   placeholder="Tell your story..." />
    )
  }
}

Editor.propTypes = {
  storage: PropTypes.shape({
    get: PropTypes.func.isRequired,
    set: PropTypes.func.isRequired
  }).isRequired
}

Editor.defaultProps = {
  storage: {
    get() {},
    set() {}
  }
}

export default Editor
