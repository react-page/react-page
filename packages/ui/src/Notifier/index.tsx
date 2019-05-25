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

import * as React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updateSetting } from '@react-page/core/lib/actions/setting';
import { getSetting } from '@react-page/core/lib/selector/setting';
import i18n from '@react-page/core/lib/service/i18n';
import { RootState } from '@react-page/core/lib/types/state';

export const dismissedMobilePreviewKey = 'mobile-preview-dismissed';

type Props = {
  updateSetting: Function;
  getSetting: Function;

  id: string;
  open: boolean;
  action: string;
  message: string;

  dismissed: boolean;
};

const handleDismiss = (
  _updateSetting: typeof updateSetting,
  id: string
) => () => updateSetting(`notifier.${id}`, true);

export interface NotifierProps {
  dismissed: boolean;
  id: string;
  open: boolean;
  action: string;
  message: string;
  updateSetting: typeof updateSetting;
}

const Notifier: React.SFC<NotifierProps> = props => (
  <Snackbar
    open={props.open && !props.dismissed}
    action={props.action}
    message={i18n.t(props.message)}
    onClose={handleDismiss(props.updateSetting, props.id)}
  />
);

const mapStateToProps = createStructuredSelector({
  dismissed: (state: RootState, props: Props) =>
    getSetting(`notifier.${props.id}`)(state),
});

const mapActionsToProps = {
  updateSetting,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Notifier);
