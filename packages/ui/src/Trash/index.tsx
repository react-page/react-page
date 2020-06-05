import Fab from '@material-ui/core/Fab';
import Delete from '@material-ui/icons/Delete';
import {
  Actions,
  connect,
  DropTarget,
  Editor,
  Selectors,
  useEditor,
} from '@react-page/core';
import classNames from 'classnames';
import throttle from 'lodash.throttle';
import * as React from 'react';
import { createStructuredSelector } from 'reselect';

export interface RawProps {
  editor: Editor;
  isLayoutMode: boolean;
  isOverCurrent: boolean;
  connectDropTarget: (node: JSX.Element) => JSX.Element;
}

type TargetProps = { removeCell(id: string): void } & RawProps;
const target = {
  hover: throttle(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (props: any, monitor: any) => {
      const item = monitor.getItem();
      if (monitor.isOver({ shallow: true })) {
        item.clearHover();
      }
    },
    200,
    { trailing: false }
  ),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  drop(props: TargetProps, monitor: any) {
    const item = monitor.getItem();
    if (monitor.didDrop() || !monitor.isOver({ shallow: true })) {
      // If the item drop occurred deeper down the tree, don't do anything
      return;
    }

    props.removeCell(item.id);
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const connectMonitor = (_connect: any, monitor: any) => ({
  connectDropTarget: _connect.dropTarget(),
  isOverCurrent: monitor.isOver({ shallow: true }),
});

class Raw extends React.Component<RawProps> {
  render() {
    const { connectDropTarget, isOverCurrent } = this.props;

    return connectDropTarget(
      <div
        className={classNames('ory-controls-trash', {
          'ory-controls-trash-active': this.props.isLayoutMode,
        })}
      >
        <Fab color="secondary" disabled={!isOverCurrent}>
          <Delete />
        </Fab>
      </div>
    );
  }
}

const types = ({ editor }: { editor: Editor }) => {
  const plugins = [
    ...Object.keys(editor.plugins.plugins.layout),
    ...Object.keys(editor.plugins.plugins.content),
  ].map(
    (p: string) =>
      (editor.plugins.plugins.content[p] &&
        editor.plugins.plugins.content[p].name) ||
      (editor.plugins.plugins.layout[p] &&
        editor.plugins.plugins.layout[p].name)
  );

  if (editor.plugins.hasNativePlugin()) {
    plugins.push(editor.plugins.getNativePlugin()().name);
  }

  return plugins;
};

const mapDispatchToProps = {
  removeCell: Actions.Cell.removeCell,
};

const mapStateToProps = createStructuredSelector(Selectors.Display);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Decorated: any = connect(
  mapStateToProps,
  mapDispatchToProps
)(DropTarget<TargetProps>(types, target, connectMonitor)(Raw));

const Trash: React.SFC = () => {
  const editor = useEditor();

  return <Decorated editor={editor} />;
};

export default Trash;
