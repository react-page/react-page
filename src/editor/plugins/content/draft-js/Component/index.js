import React, { Component, PropTypes } from 'react'
import { Editor, RichUtils } from 'draft-js'
import blockRenderer from './blockRenderer'
import { toEditorState, fromEditorState } from './helper/content'
import debounce from 'lodash.debounce'
import 'draft-js/dist/Draft.css'

const fire = debounce(({ data, onChange }) => onChange(data), 1000, { leading: false })

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
        this.setState({ editorState: newState })

        fire({ onChange, data: { editorState: newState } })
        return true
      }

      return false
    }
  }

  onChange(editorState) {
    const { onChange } = this.props
    this.setState({ editorState })
    fire({ onChange, data: { editorState } })
  }

  render() {
    const { readOnly } = this.props
    const { editorState } = this.state

    return (
      <div>
        <Editor blockRendererFn={blockRenderer}
                editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
                readOnly={readOnly}
                placeholder="Tell your story..."
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
