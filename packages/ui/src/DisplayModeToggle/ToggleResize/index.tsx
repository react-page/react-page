import * as React from 'react';
import Resize from '@material-ui/icons/SettingsOverscan';

import { connect, Selectors, Actions } from '@react-page/core';
import { createStructuredSelector } from 'reselect';

import Button from '../Button/index';

export interface InnerReduxProps {
  isResizeMode: boolean;
}

export interface InnerActionProps {
  resizeMode: React.MouseEventHandler<HTMLElement>;
}

interface OwnProps {
  label: string;
}

export type InnerProps = InnerReduxProps & InnerActionProps & OwnProps;

const Inner: React.SFC<InnerProps> = (props) => (
  <Button
    icon={<Resize />}
    description={props.label}
    active={props.isResizeMode}
    onClick={props.resizeMode}
  />
);

const mapStateToProps = createStructuredSelector({
  isResizeMode: Selectors.Display.isResizeMode,
});
const mapDispatchToProps = { resizeMode: Actions.Display.resizeMode };

export default connect(mapStateToProps, mapDispatchToProps)(Inner);
