import Fab from '@material-ui/core/Fab';
import Delete from '@material-ui/icons/Delete';
import {
  DropTarget,
  Editor,
  useEditor,
  useIsLayoutMode,
  useRemoveCell,
} from '@react-page/core';
import classNames from 'classnames';
import throttle from 'lodash.throttle';
import * as React from 'react';

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

const Raw: React.FC<RawProps> = ({ isOverCurrent, connectDropTarget }) => {
  const isLayoutMode = useIsLayoutMode();
  return connectDropTarget(
    <div
      className={classNames('ory-controls-trash', {
        'ory-controls-trash-active': isLayoutMode,
      })}
    >
      <Fab color="secondary" disabled={!isOverCurrent}>
        <Delete />
      </Fab>
    </div>
  );
};

const types = ({ editor }: { editor: Editor }) => {
  const plugins = editor.plugins.getRegisteredNames();

  if (editor.plugins.hasNativePlugin()) {
    plugins.push(editor.plugins.getNativePlugin()().name);
  }

  return plugins;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Decorated: any = DropTarget<TargetProps>(
  types,
  target,
  connectMonitor
)(Raw);

const Trash: React.SFC = () => {
  const editor = useEditor();
  const removeCell = useRemoveCell();

  return <Decorated editor={editor} removeCell={removeCell} />;
};

export default Trash;
