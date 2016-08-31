// @flow
/* eslint no-invalid-this: "off" */
import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { updateSetting } from 'src/editor/actions/setting'
import { getSetting } from 'src/editor/selector/setting'
import i18n from 'src/editor/service/i18n'

export const dismissedMobilePreviewKey = 'mobile-preview-dismissed'

type Props = {
  updateSetting: Function,
  getSetting: Function,

  id: string,
  open: boolean,
  action: string,
  message: string,

  dismissed: boolean,
}

const handleDismiss = (updateSetting: Function, id: string) => () => updateSetting(`notifier.${id}`, true)

const Notifier = ({ dismissed, id, open, action = 'dismiss', message, updateSetting }: Props) => (
  <Snackbar
    open={open && !dismissed}
    action={action}
    message={i18n.t(message)}
    onActionTouchTap={handleDismiss(updateSetting, id)}
  />
)

const mapStateToProps = createStructuredSelector({
  dismissed: (state: Object, props: Props) => getSetting(`notifier.${props.id}`)(state)
})

const mapActionsToProps = {
  updateSetting
}

export default connect(mapStateToProps, mapActionsToProps)(Notifier)
