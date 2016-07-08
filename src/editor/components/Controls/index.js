import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  editMode,
  previewMode,
  layoutMode,
  previousMode,
  insertMode,
  DISPLAY_MODE_EDIT,
  DISPLAY_MODE_PREVIEW
} from 'src/editor/actions/display'
import { isEditMode, isLayoutMode, isPreviewMode, isInsertMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Create from 'material-ui/svg-icons/content/create'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ViewQuilt from 'material-ui/svg-icons/action/view-quilt'
import Devices from 'material-ui/svg-icons/device/devices'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import cssModules from 'react-css-modules'
import Toolbar from 'src/editor/components/Toolbar'

import styles from './index.scoped.css'

const toggleLayoutMode = ({ check, previousMode, cb, fallback }) => () => check ? previousMode(fallback) : cb()

const Controls = ({ isLayoutMode, isPreviewMode, isInsertMode, layoutMode, insertMode, editMode, isEditMode, previewMode, ...props }) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div>
      <Toolbar />
      <div styleName="controls">
        <div styleName="controls-right">
          <FloatingActionButton secondary={isPreviewMode}
                                onClick={toggleLayoutMode({ check: isPreviewMode, cb: previewMode, fallback: DISPLAY_MODE_EDIT, ...props })}
          >
            <Devices />
          </FloatingActionButton>
        </div>
        <div styleName="controls-bottom">
          <FloatingActionButton secondary={isEditMode}
                                onClick={toggleLayoutMode({ check: isEditMode, cb: editMode, fallback: DISPLAY_MODE_PREVIEW, ...props })}
          >
            <Create />
          </FloatingActionButton>
          <FloatingActionButton secondary={isInsertMode}
                                onClick={toggleLayoutMode({ check: isInsertMode, cb: insertMode, fallback: DISPLAY_MODE_EDIT, ...props })}
          >
            <ContentAdd />
          </FloatingActionButton>
          <FloatingActionButton secondary={isLayoutMode}
                                onClick={toggleLayoutMode({ check: isLayoutMode, cb: layoutMode, fallback: DISPLAY_MODE_PREVIEW, ...props })}
          >
            <ViewQuilt />
          </FloatingActionButton>
        </div>
      </div>
    </div>
  </MuiThemeProvider>
)

Controls.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  isLayoutMode: PropTypes.bool.isRequired,
  isPreviewMode: PropTypes.bool.isRequired,
  isInsertMode: PropTypes.bool.isRequired,
  editMode: PropTypes.func.isRequired,
  previewMode: PropTypes.func.isRequired,
  layoutMode: PropTypes.func.isRequired,
  previousMode: PropTypes.func.isRequired,
  insertMode: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({
  isEditMode, isLayoutMode, isPreviewMode, isInsertMode
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  editMode, previewMode, layoutMode, previousMode, insertMode
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(Controls, styles))
