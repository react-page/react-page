import React, { Component, PropTypes } from 'react'
import { Editor, RichUtils } from 'draft-js'
import blockRenderer from './blockRenderer'
import { toEditorState } from './helper/content'
import 'draft-js/dist/Draft.css'

class EditView extends Component {
  constructor(props) {
    super(props)

    this.state = { editorState: toEditorState(props) }
    this.readOnly = () => this.refs.editor.readOnly()
    this.onChange = this.onChange.bind(this)

    this.handleKeyCommand = (command) => {
      const { onChange, editorState } = this.props
      const newState = RichUtils.handleKeyCommand(editorState, command)

      if (newState) {
        onChange({ editorState })
        return true
      }

      return false
    }
  }

  onChange(editorState) {
      this.props.onChange({ editorState })
  }

  render() {
    const { readOnly, editorState = this.state.editorState } = this.props

    return (
      <div>
        <Editor blockRendererFn={blockRenderer}
                editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
                readOnly={readOnly}
                placeholder="Tell your story..."
                ref="editor"
        />
      </div>
    )
  }
}

EditView.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired
}

export default EditView
