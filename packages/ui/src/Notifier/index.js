/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

// @flow
import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { updateSetting } from 'ory-editor-core/lib/actions/setting'
import { getSetting } from 'ory-editor-core/lib/selector/setting'
import i18n from 'ory-editor-core/lib/service/i18n'

export const dismissedMobilePreviewKey = 'mobile-preview-dismissed'

type Props = {
  updateSetting: Function,
  getSetting: Function,

  id: string,
  open: boolean,
  action: string,
  message: string,

  dismissed: boolean
}

const handleDismiss = (updateSetting: Function, id: string) => () =>
  updateSetting(`notifier.${id}`, true)

const Notifier = ({
  dismissed,
  id,
  open,
  action = 'dismiss',
  message,
  updateSetting
}: Props) => (
  <Snackbar
    open={open && !dismissed}
    action={action}
    message={i18n.t(message)}
    onActionTouchTap={handleDismiss(updateSetting, id)}
  />
)

const mapStateToProps = createStructuredSelector({
  dismissed: (state: Object, props: Props) =>
    getSetting(`notifier.${props.id}`)(state)
})

const mapActionsToProps = {
  updateSetting
}

export default connect(mapStateToProps, mapActionsToProps)(Notifier)
