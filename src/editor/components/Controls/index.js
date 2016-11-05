// @flow
import React from 'react'
import { connect, Provider } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  editMode,
  previewMode,
  layoutMode,
  previousMode,
  insertMode,
  resizeMode,
  DISPLAY_MODE_EDIT,
  DISPLAY_MODE_PREVIEW
} from 'src/editor/actions/display'
import { isEditMode, isLayoutMode, isPreviewMode, isInsertMode, isResizeMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'
import Create from 'material-ui/svg-icons/content/create'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ViewQuilt from 'material-ui/svg-icons/action/view-quilt'
import Resize from 'material-ui/svg-icons/action/settings-overscan'
import Devices from 'material-ui/svg-icons/device/devices'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Toolbar from 'src/editor/components/Toolbar'
import Button from './Button'
import Trash from './Trash'
import device from 'device.js'
import cssModules from 'react-css-modules'
import DragDropContext from 'src/editor/components/DragDropContext'
import styles from './index.scoped.css'
import Editor from 'src/editor'

const toggleLayoutMode = ({ check, previousMode, cb, fallback }: Object) => () => check ? previousMode(fallback) : cb()

const Inner = ({
  isLayoutMode, isPreviewMode, isInsertMode, layoutMode, insertMode, editMode,
  isEditMode, previewMode, isResizeMode, resizeMode, plugins,
  ...props
}: {
  isEditMode: bool,
  isLayoutMode: bool,
  isPreviewMode: bool,
  isInsertMode: bool,
  isResizeMode: bool,
  editMode: Function,
  previewMode: Function,
  layoutMode: Function,
  previousMode: Function,
  insertMode: Function,
  resizeMode: Function,
  plugins: Object
}) => (
  <DragDropContext>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
        <Trash plugins={plugins} isLayoutMode={isLayoutMode} />

        <Toolbar plugins={plugins} />
        <div styleName="controls">

          <div styleName="controls-right">
            <Button
              icon={<Create />}
              description="Write"
              active={isEditMode}
              onClick={toggleLayoutMode({
                check: isEditMode,
                cb: editMode,
                fallback: DISPLAY_MODE_PREVIEW, ...props
              })}
            />
            <div styleName="clearfix" />
          </div>

          <div styleName="controls-right">
            <Button
              icon={<ContentAdd />}
              description={device().mobile() ? 'Disabled on mobile' : 'Add things'}
              active={isInsertMode}
              disabled={device().mobile()}
              onClick={toggleLayoutMode({
                check: isInsertMode,
                cb: insertMode,
                fallback: DISPLAY_MODE_EDIT, ...props
              })}
            />
            <div styleName="clearfix" />
          </div>

          <div styleName="controls-right">
            <Button
              icon={<Devices />}
              description="Responsive preview"
              active={isPreviewMode}
              onClick={toggleLayoutMode({
                check: isPreviewMode,
                cb: previewMode,
                fallback: DISPLAY_MODE_EDIT, ...props
              })}
            />
            <div styleName="clearfix" />
          </div>

          <div styleName="controls-right">
            <Button
              icon={<ViewQuilt />}
              active={isLayoutMode}
              description={device().mobile() ? 'Disabled on mobile' : 'Rearrange layout'}
              disabled={device().mobile()}
              onClick={toggleLayoutMode({
                check: isLayoutMode,
                cb: layoutMode,
                fallback: DISPLAY_MODE_PREVIEW, ...props
              })}
            />
            <div styleName="clearfix" />
          </div>

          <div styleName="controls-right">
            <Button
              icon={<Resize />}
              active={isResizeMode}
              disabled={device().mobile()}
              description={device().mobile() ? 'Disabled on mobile' : 'Resize things'}
              onClick={toggleLayoutMode({
                check: isResizeMode,
                cb: resizeMode,
                fallback: DISPLAY_MODE_PREVIEW, ...props
              })}
            />
            <div styleName="clearfix" />
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  </DragDropContext>
)

const mapStateToProps = createStructuredSelector({
  isEditMode, isLayoutMode, isPreviewMode, isInsertMode, isResizeMode
})

const mapDispatchToProps = (dispatch: Function) => bindActionCreators({
  editMode, previewMode, layoutMode, previousMode, insertMode, resizeMode
}, dispatch)

const InnerConnected = connect(mapStateToProps, mapDispatchToProps)(cssModules(Inner, styles))

const Controls = ({ editor }: Editor) => (
  <Provider store={editor.store}>
    <InnerConnected plugins={editor.plugins} />
  </Provider>
)

export default Controls
