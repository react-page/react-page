import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Editor, RichUtils } from 'draft-js'

import 'draft-js/dist/Draft.css'

import { replaceEditorState } from './actions'
import { editorState } from './selectors'
import Toolbar from './Toolbar'

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
    const { editorState, onChange } = this.props

    return (
      <div>
        <Toolbar />
        <Editor editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={onChange}
                placeholder="Tell your story..."
                ref="editor" />
      </div>
    )
  }
}

Editable.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  editorState: editorState(state)
})
const mapDispatchToProps = (dispatch) => bindActionCreators({ onChange: replaceEditorState }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Editable)
