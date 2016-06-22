import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Editor, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { replaceEditorState } from "./actions";
import { editorState, readOnly } from "./selectors";
import Toolbar from "./Toolbar";
import blockRenderer from "./blockRenderer";
import {updateCell} from "src/common/actions/cell";

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
        onChange({editorState: newState})
        return true
      }

      return false
    }
  }

  render() {
    const { editorState, onChange, readOnly } = this.props

    return (
      <div>
        <Editor blockRendererFn={blockRenderer}
                editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={(editorState) => onChange({editorState})}
                placeholder="Tell your story..."
                readOnly={readOnly}
                ref="editor"/>
      </div>
    )
  }
}

EditView.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
}

export default EditView