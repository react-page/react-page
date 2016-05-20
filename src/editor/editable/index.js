import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Editor, RichUtils } from 'draft-js'

import 'draft-js/dist/Draft.css'

import { replaceEditorState } from './actions'
import { editorState, readOnly } from './selectors'
import Toolbar from './Toolbar'
import blockRenderer from './blockRenderer'

class Editable extends Component {
  constructor(props) {
    super(props)

    this.focus = () => this.refs.editor.focus()

    this.handleKeyCommand = (command) => {
      const { editorState, onChange } = this.props

      const newState = RichUtils.handleKeyCommand(editorState, command)

      if (newState) {
        onChange(newState)
        return true
      }

      return false
    }
  }

  render() {
    const { editorState, onChange, readOnly } = this.props

    return (
      <div>
        <Toolbar />
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

Editable.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  editorState: editorState(state),
  readOnly: readOnly(state)
})
const mapDispatchToProps = (dispatch) => bindActionCreators({ onChange: replaceEditorState }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Editable)
