import React, { Component } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'

import 'draft-js/dist/Draft.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { editorState: EditorState.createEmpty() }

    this.handleKeyCommand = this.handleKeyCommand.bind(this)
    this.onChange = (editorState) => this.setState({ editorState })
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)

    if (newState) {
      this.onChange(newState)
      return true
    }

    return false
  }

  render() {
    return (
      <Editor editorState={this.state.editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              placeholder="Tell your story..." />
    )
  }
}

export default App
