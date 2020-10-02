import * as React from 'react';
import ViewQuilt from '@material-ui/icons/ViewQuilt';
import Button from '../Button';

import { connect, Selectors, Actions } from '@react-page/core';

import { createStructuredSelector } from 'reselect';

export interface InnerReduxProps {
  isLayoutMode: boolean;
}

export interface InnerActionProps {
  layoutMode: React.MouseEventHandler<HTMLElement>;
}

interface OwnProps {
  label: string;
}

export type InnerProps = InnerReduxProps & InnerActionProps & OwnProps;

const Inner: React.SFC<InnerProps> = (props) => (
  <Button
    icon={<ViewQuilt />}
    description={props.label}
    active={props.isLayoutMode}
    onClick={props.layoutMode}
  />
);

const mapStateToProps = createStructuredSelector({
  isLayoutMode: Selectors.Display.isLayoutMode,
});
const mapDispatchToProps = { layoutMode: Actions.Display.layoutMode };

export default connect(mapStateToProps, mapDispatchToProps)(Inner);
