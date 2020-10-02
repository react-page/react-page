import * as React from 'react';
import Create from '@material-ui/icons/Create';
import Button from '../Button/index';

import { connect, Actions, Selectors } from '@react-page/core';
import { createStructuredSelector } from 'reselect';

export interface InnerReduxProps {
  isEditMode: boolean;
}

export interface InnerActionProps {
  editMode: React.MouseEventHandler<HTMLElement>;
}

interface OwnProps {
  label: string;
}

export type InnerProps = InnerReduxProps & InnerActionProps & OwnProps;

const Inner: React.SFC<InnerProps> = (props) => (
  <Button
    icon={<Create />}
    description={props.label}
    active={props.isEditMode}
    onClick={props.editMode}
  />
);

const mapStateToProps = createStructuredSelector({
  isEditMode: Selectors.Display.isEditMode,
});
const mapDispatchToProps = { editMode: Actions.Display.editMode };

export default connect(mapStateToProps, mapDispatchToProps)(Inner);
