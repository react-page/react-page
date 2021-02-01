import React from 'react';
import { getCellStyle } from '../../../utils/getCellStyle';
import {
  useCellHasPlugin,
  useFocusCell,
  useIsEditMode,
  useIsFocused,
  useIsPreviewMode,
  useNodeChildrenIds,
  usePluginOfCell,
  useSetEditMode,
} from '../../hooks';
import Row from '../../Row';
import Draggable from '../Draggable';
import { useDragHandle } from '../Draggable/useDragHandle';
import Droppable from '../Droppable';
import InsertNew from '../InsertNew';
import PluginComponent from '../PluginComponent';

const Inner: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  const [isDragging, dragRef, previewElement] = useDragHandle(nodeId);
  const isPreviewMode = useIsPreviewMode();
  const isEditMode = useIsEditMode();
  const cellShouldHavePlugin = useCellHasPlugin(nodeId);
  const plugin = usePluginOfCell(nodeId);
  const setEditMode = useSetEditMode();
  const focus = useFocusCell(nodeId);
  const focused = useIsFocused(nodeId);
  const childrenIds = useNodeChildrenIds(nodeId);
  const ref = React.useRef<HTMLDivElement>();

  const hasChildren = childrenIds.length > 0;

  const doFocus = React.useCallback(() => {
    if (!focused && isEditMode) {
      focus(false, 'onMouseDown');
      setEditMode();
    }
  }, [focus, focused, isEditMode]);
  const onMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        (e.target as HTMLDivElement).closest('.react-page-cell-inner') ===
          // eslint-disable-next-line react/no-find-dom-node
          ref.current &&
        !(e.target as HTMLDivElement).classList.contains('resize-handle')
      ) {
        doFocus();
      }
      return true;
    },
    [doFocus]
  );
  const insertAllowed = plugin?.childConstraints?.maxChildren
    ? plugin?.childConstraints?.maxChildren > childrenIds.length
    : true;

  const cellStyle = getCellStyle(plugin);
  const children = childrenIds.map((id) => <Row nodeId={id} key={id} />);
  if (!cellShouldHavePlugin) {
    return <Droppable nodeId={nodeId}>{children}</Droppable>;
  }
  return (
    <>
      {previewElement}
      <Droppable nodeId={nodeId} isLeaf={!hasChildren}>
        <Draggable nodeId={nodeId} isLeaf={!hasChildren}>
          <div
            className="react-page-cell-description"
            ref={dragRef}
            onClick={doFocus}
          >
            {plugin?.title || plugin?.text}
          </div>
          <div
            onMouseDown={!isPreviewMode ? onMouseDown : undefined}
            tabIndex={-1}
            style={{
              outline: 'none',
              boxSizing: 'border-box',
              height: '100%',
              ...(cellStyle ?? {}),
            }}
            className={
              'react-page-cell-inner' +
              (hasChildren ? '' : ' react-page-cell-leaf')
            }
            ref={ref}
          >
            <PluginComponent nodeId={nodeId} hasChildren={hasChildren}>
              {children}
              {insertAllowed ? <InsertNew parentCellId={nodeId} /> : null}
            </PluginComponent>
          </div>
        </Draggable>
      </Droppable>
    </>
  );
};

export default React.memo(Inner);
