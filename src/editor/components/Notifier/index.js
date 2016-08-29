// @flow
/* eslint no-invalid-this: "off" */
import React, { Component } from 'react'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import { isPreviewMode } from 'src/editor/selector/display'
import { createStructuredSelector } from 'reselect'
import { updateSetting } from 'src/editor/actions/setting'
import { getSetting } from 'src/editor/selector/setting'
import i18n from 'src/editor/service/i18n'

export const dismissedMobilePreviewKey = 'notifier.mobile-preview-dismissed'

class Notifier extends Component {
  props: {
    updateSetting: updateSetting,
    getSetting: getSetting,
    isPreviewMode: boolean,
    dismissedMobilePreviewKey: boolean
  };

  handleRequestClose = (key: string) => () => {
    this.props.updateSetting(key, true)
  }

  render = () => {
    const { isPreviewMode, dismissedMobilePreview } = this.props
    return (
      <div>
        <Snackbar
          open={isPreviewMode && !dismissedMobilePreview}
          action="dismiss"
          message={i18n.t('Resize the browser window for mobile preview')}
          onActionTouchTap={this.handleRequestClose(dismissedMobilePreviewKey)}
        />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isPreviewMode,
  dismissedMobilePreview: getSetting(dismissedMobilePreviewKey)
})

const mapActionsToProps = {
  updateSetting
}

export default connect(mapStateToProps, mapActionsToProps)(Notifier)
