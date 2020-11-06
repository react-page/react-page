import * as React from 'react';

import {
  useCellData,
  useCellHasPlugin,
  useCellPlugin,
  useEditableId,
  useFocusCell,
  useIsEditMode,
  useIsFocused,
  useIsPreviewMode,
  useLang,
  useNodeChildrenIds,
  useRemoveCell,
  useUpdateCellData,
} from '../../hooks';
import Row from '../../Row';
import Draggable from '../Draggable';
import Droppable from '../Droppable';
import InsertNew from '../InsertNew';
import PluginMissing from '../PluginMissing';

const Inner: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  const lang = useLang();
  const editableId = useEditableId();
  const isPreviewMode = useIsPreviewMode();
  const isEditMode = useIsEditMode();

  const updateCellData = useUpdateCellData(nodeId);
  const cellData = useCellData(nodeId);

  const plugin = useCellPlugin(nodeId);
  const cellShouldHavePlugin = useCellHasPlugin(nodeId);

  const focus = useFocusCell(nodeId);
  const focused = useIsFocused(nodeId);
  const childrenIds = useNodeChildrenIds(nodeId);
  const ref = React.useRef<HTMLDivElement>();
  const Component = plugin?.Component ?? PluginMissing;
  const remove = useRemoveCell(nodeId);
  const hasChildren = childrenIds.length > 0;

  const onMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        !focused &&
        (e.target as HTMLDivElement).closest('.ory-cell-inner') ===
          // eslint-disable-next-line react/no-find-dom-node
          ref.current &&
        !(e.target as HTMLDivElement).classList.contains('resize-handle')
      ) {
        focus(false, 'onMouseDown');
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
          style={{ outline: 'none' }}
          className={'ory-cell-inner' + (hasChildren ? '' : ' ory-cell-leaf')}
          ref={ref}
        >
          <Component
            editable={editableId}
            nodeId={nodeId}
            lang={lang}
            state={cellData}
            data={cellData}
            pluginConfig={plugin}
            focused={isEditMode && focused}
            readOnly={!isEditMode}
            onChange={updateCellData}
            isEditMode={isEditMode}
            isPreviewMode={isPreviewMode}
            remove={remove}
          >
            {children}
            <InsertNew parentCellId={nodeId} />
          </Component>
        </div>
      </Draggable>
    </Droppable>
  );
};

export default React.memo(Inner);
