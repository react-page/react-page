import * as React from 'react';
import Devices from '@material-ui/icons/Devices';

import { connect, Actions, Selectors } from '@react-page/core';

import { createStructuredSelector } from 'reselect';
import Button from '../Button/index';

export interface InnerReduxProps {
  isPreviewMode: boolean;
}

export interface InnerActionProps {
  previewMode: React.MouseEventHandler<HTMLElement>;
}

interface OwnProps {
  label: string;
}

export type InnerProps = InnerReduxProps & InnerActionProps & OwnProps;

const Inner: React.SFC<InnerProps> = (props) => (
  <Button
    icon={<Devices />}
    description={props.label}
    active={props.isPreviewMode}
    onClick={props.previewMode}
  />
);

const mapStateToProps = createStructuredSelector({
  isPreviewMode: Selectors.Display.isPreviewMode,
});
const mapDispatchToProps = { previewMode: Actions.Display.previewMode };

export default connect(mapStateToProps, mapDispatchToProps)(Inner);
