import * as React from 'react';

import {
  useCell,
  useCellData,
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

const Layout: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  const node = useCell(nodeId);
  const lang = useLang();
  const editableId = useEditableId();
  const isPreviewMode = useIsPreviewMode();
  const isEditMode = useIsEditMode();

  const updateCellLayout = useUpdateCellLayout(nodeId);
  const cellData = useCellData(nodeId);
  const plugin = useCellPlugin(nodeId);

  const focus = useFocusCell(nodeId);
  const focused = useIsFocused(nodeId);

  const ref = React.useRef<HTMLDivElement>();
  const { Component } = plugin;
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

  return (
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
        {node.rows?.map((r) => (
          <Row nodeId={r.id} key={r.id} />
        ))}
      </Component>
    </div>
  );
};

export default Layout;
