import Fab from '@material-ui/core/Fab';
import Delete from '@material-ui/icons/Delete';
import {
  DropTarget,
  Editor,
  useEditor,
  useIsLayoutMode,
  useRemoveCellById,
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

type TargetProps = { removeCellById(id: string): void } & RawProps;
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

    props.removeCellById(item.id);
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
  const removeCellById = useRemoveCellById();

  return <Decorated editor={editor} removeCellById={removeCellById} />;
};

export default Trash;
