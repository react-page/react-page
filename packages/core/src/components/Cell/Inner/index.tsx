import * as React from 'react';

import {
  useCell,
  useCellData,
  useCellHasPlugin,
  useCellPlugin,
  useEditableId,
  useFocusCell,
  useIsEditMode,
  useIsFocused,
  useIsPreviewMode,
  useLang,
  useRemoveCell,
  useUpdateCellLayout,
} from '../../hooks';
import Row from '../../Row';
import Draggable from '../Draggable';
import Droppable from '../Droppable';
import PluginMissing from '../PluginMissing';

const Inner: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  const node = useCell(nodeId);
  const lang = useLang();
  const editableId = useEditableId();
  const isPreviewMode = useIsPreviewMode();
  const isEditMode = useIsEditMode();

  const updateCellLayout = useUpdateCellLayout(nodeId);
  const cellData = useCellData(nodeId);
  const plugin = useCellPlugin(nodeId);
  const cellShouldHavePlugin = useCellHasPlugin(nodeId);

  const focus = useFocusCell(nodeId);
  const focused = useIsFocused(nodeId);

  const ref = React.useRef<HTMLDivElement>();
  const Component = plugin?.Component ?? PluginMissing;
  const remove = useRemoveCell(nodeId);
  const hasChildren = node.rows?.length > 0;
  const onMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        !focused &&
        (e.target as HTMLDivElement).closest('.ory-cell-inner') ===
          // eslint-disable-next-line react/no-find-dom-node
          ref.current
      ) {
        focus(false, 'onMouseDown');
      }
      return true;
    },
    [focus, focused]
  );

  const children = node.rows?.map((r) => <Row nodeId={r.id} key={r.id} />);
  if (!cellShouldHavePlugin) {
    return <Droppable nodeId={nodeId}>{children}</Droppable>;
  }
  return (
    <Droppable nodeId={nodeId} isLeaf={!hasChildren}>
      <Draggable nodeId={nodeId} isLeaf={!hasChildren}>
        <div
          onMouseDown={!isPreviewMode ? onMouseDown : undefined}
          tabIndex={-1}
          style={{ outline: 'none' }}
          className={'ory-cell-inner' + (hasChildren ? '' : ' ory-cell-leaf')}
          ref={ref}
        >
          <Component
            editable={editableId}
            cell={node}
            nodeId={nodeId}
            lang={lang}
            state={cellData}
            data={cellData}
            pluginConfig={plugin}
            focused={isEditMode && focused}
            readOnly={!isEditMode}
            onChange={updateCellLayout}
            isEditMode={isEditMode}
            isPreviewMode={isPreviewMode}
            remove={remove}
          >
            {children}
          </Component>
        </div>
      </Draggable>
    </Droppable>
  );
};

export default React.memo(Inner);
