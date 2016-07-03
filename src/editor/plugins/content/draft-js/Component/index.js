import React, { Component, PropTypes } from 'react'
import { Editor, RichUtils, EditorState } from 'draft-js'
import blockRenderer from './blockRenderer'

// import 'draft-js/dist/Draft.css'

export const RenderView = ({ id, height }) => (
  <div>content</div>
)

class EditView extends Component {
  constructor(props) {
    super(props)

    this.readOnly = () => this.refs.editor.readOnly()

    this.handleKeyCommand = (command) => {
      const { editorState, onChange } = this.props

      const newState = RichUtils.handleKeyCommand(editorState, command)

      if (newState) {
        onChange({ editorState: newState })
        return true
      }

      return false
    }
  }

  render() {
    const {
      editorState = EditorState.createEmpty(),
      onChange,
      readOnly
    } = this.props

    return (
      <div>
        <Editor blockRendererFn={blockRenderer}
                editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={onChange}
                placeholder="Tell your story..."
                readOnly={readOnly}
                ref="editor" />
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
