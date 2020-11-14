import * as React from 'react';
import {
  useCellHasPlugin,
  useFocusCell,
  useIsFocused,
  useIsPreviewMode,
  useNodeChildrenIds,
  useSetEditMode,
} from '../../hooks';
import Row from '../../Row';
import Draggable from '../Draggable';
import Droppable from '../Droppable';
import InsertNew from '../InsertNew';
import PluginComponent from '../PluginComponent';

const Inner: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  const isPreviewMode = useIsPreviewMode();
  const cellShouldHavePlugin = useCellHasPlugin(nodeId);
  const setEditMode = useSetEditMode();
  const focus = useFocusCell(nodeId);
  const focused = useIsFocused(nodeId);
  const childrenIds = useNodeChildrenIds(nodeId);
  const ref = React.useRef<HTMLDivElement>();

  const hasChildren = childrenIds.length > 0;

  const onMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        !focused &&
        (e.target as HTMLDivElement).closest('.react-page-cell-inner') ===
          // eslint-disable-next-line react/no-find-dom-node
          ref.current &&
        !(e.target as HTMLDivElement).classList.contains('resize-handle')
      ) {
        focus(false, 'onMouseDown');
        setEditMode();
      }
      return true;
    },
    [focus, focused]
  );

  const children = childrenIds.map((id) => <Row nodeId={id} key={id} />);
  if (!cellShouldHavePlugin) {
    return <Droppable nodeId={nodeId}>{children}</Droppable>;
  }
  return (
    <Droppable nodeId={nodeId} isLeaf={!hasChildren}>
      <Draggable nodeId={nodeId} isLeaf={!hasChildren}>
        <div
          onMouseDown={!isPreviewMode ? onMouseDown : undefined}
          tabIndex={-1}
          style={{ outline: 'none', height: '100%' }}
          className={
            'react-page-cell-inner' +
            (hasChildren ? '' : ' react-page-cell-leaf')
          }
          ref={ref}
        >
          <PluginComponent nodeId={nodeId}>
            {children}
            <InsertNew parentCellId={nodeId} />
          </PluginComponent>
        </div>
      </Draggable>
    </Droppable>
  );
};

export default React.memo(Inner);
