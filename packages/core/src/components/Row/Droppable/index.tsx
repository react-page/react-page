import * as React from 'react';
import { ConnectDropTarget, DropTarget as dropTarget } from 'react-dnd';
import { dragActions } from '../../../actions/cell/drag';
import { insertActions } from '../../../actions/cell/insert';
import { connect } from '../../../reduxConnect';
import { ComponetizedRow } from '../../../types/editable';
import { connect as monitorConnect, target } from './dnd';

export type Props = ComponetizedRow & {
  // tslint:disable-next-line:no-any
  children: any;
  isLayoutMode: boolean;
  isInsertMode: boolean;
  isOverCurrent: boolean;
  connectDropTarget: ConnectDropTarget;
};

export class Droppable extends React.Component<Props> {
  render() {
    if (!(this.props.isLayoutMode || this.props.isInsertMode)) {
      return (
        <div className="ory-row-droppable-container">{this.props.children}</div>
      );
    }

    return this.props.connectDropTarget(
      <div className="ory-row-droppable">{this.props.children}</div>
    );
  }
}

const mapDispatchToProps = { ...dragActions, ...insertActions };

export default (dropTypes: string[] = ['CELL']) =>
  connect(
    null,
    mapDispatchToProps
  )(dropTarget(dropTypes, target, monitorConnect)(Droppable));
