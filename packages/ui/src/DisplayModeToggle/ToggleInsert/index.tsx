import * as React from 'react';
import ContentAdd from '@material-ui/icons/Add';
import Button from '../Button/index';

import { connect, Actions, Selectors } from '@react-page/core';

import { createStructuredSelector } from 'reselect';

export interface InnerReduxProps {
  isInsertMode: boolean;
}

export interface InnerActionProps {
  insertMode: React.MouseEventHandler<HTMLElement>;
}

interface OwnProps {
  label: string;
}

export type InnerProps = InnerReduxProps & InnerActionProps & OwnProps;

const Inner: React.SFC<InnerProps> = (props) => (
  <Button
    icon={<ContentAdd />}
    description={props.label}
    active={props.isInsertMode}
    onClick={props.insertMode}
  />
);

const mapStateToProps = createStructuredSelector({
  isInsertMode: Selectors.Display.isInsertMode,
});
const mapDispatchToProps = { insertMode: Actions.Display.insertMode };

export default connect(mapStateToProps, mapDispatchToProps)(Inner);
