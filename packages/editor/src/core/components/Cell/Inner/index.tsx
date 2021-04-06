import React from 'react';
import {
  getPluginCellSpacing,
  normalizeCellSpacing,
} from '../../../utils/getCellSpacing';
import {
  useCellHasPlugin,
  useCellStyle,
  useFocusCell,
  useIsEditMode,
  useIsFocused,
  useIsPreviewMode,
  useNodeChildrenIds,
  usePluginOfCell,
  useSetEditMode,
  useCellSpacing,
  useCellData,
  useCellSpacingProvider,
  useOptions,
} from '../../hooks';
import Row from '../../Row';
import Draggable from '../Draggable';
import Droppable from '../Droppable';
import InsertNew from '../InsertNew';
import PluginComponent from '../PluginComponent';

const Inner: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  const isPreviewMode = useIsPreviewMode();
  const isEditMode = useIsEditMode();
  const cellShouldHavePlugin = useCellHasPlugin(nodeId);
  const plugin = usePluginOfCell(nodeId);
  const setEditMode = useSetEditMode();
  const focus = useFocusCell(nodeId);
  const focused = useIsFocused(nodeId);
  const childrenIds = useNodeChildrenIds(nodeId);
  let { y: cellSpacingY } = useCellSpacing();
  const ref = React.useRef<HTMLDivElement>();

  const options = useOptions();
  const RowComponent = options.components?.Row ?? Row;

  const hasChildren = childrenIds.length > 0;

  const data = useCellData(nodeId);
  const pluginCellSpacing = getPluginCellSpacing(plugin, data);
  const [Provider, providerValue] = useCellSpacingProvider(pluginCellSpacing);
  if (typeof pluginCellSpacing !== 'undefined' && pluginCellSpacing != null) {
    cellSpacingY = normalizeCellSpacing(pluginCellSpacing).y;
  }

  const onClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;

      // check whether the click was inside cell-inner, but not inside a nested cell
      if (
        !focused &&
        isEditMode &&
        // this arrives when they stop resizing
        !target.classList.contains('react-page-row') &&
        target?.closest &&
        target.closest('.react-page-cell-inner') === ref.current &&
        target.closest('.react-page-cell.react-page-cell-has-plugin') ===
          ref.current.closest('.react-page-cell')
      ) {
        focus(false, 'onClick');
        setEditMode();
      }
    },
    [focus, focused, isEditMode, setEditMode]
  );
  const insertAllowed = plugin?.childConstraints?.maxChildren
    ? plugin?.childConstraints?.maxChildren > childrenIds.length
    : true;
  const cellStyle = useCellStyle(nodeId);

  const children = childrenIds.map((id) => (
    <RowComponent nodeId={id} key={id} />
  ));
  if (!cellShouldHavePlugin) {
    return <Droppable nodeId={nodeId}>{children}</Droppable>;
  }
  return (
    <Droppable nodeId={nodeId} isLeaf={!hasChildren}>
      <Draggable nodeId={nodeId} isLeaf={!hasChildren}>
        <div
          onClick={!isPreviewMode ? onClick : undefined}
          tabIndex={-1}
          style={{
            ...(cellStyle ?? {}),
          }}
          className={
            'react-page-cell-inner' +
            (hasChildren ? '' : ' react-page-cell-inner-leaf')
          }
          ref={ref}
        >
          <PluginComponent nodeId={nodeId} hasChildren={hasChildren}>
            {hasChildren ? (
              <Provider value={providerValue}>
                <div
                  style={
                    cellSpacingY !== 0
                      ? { margin: `${-cellSpacingY / 2}px 0` }
                      : undefined
                  }
                >
                  {children}
                </div>
              </Provider>
            ) : (
              children
            )}
            {insertAllowed ? <InsertNew parentCellId={nodeId} /> : null}
          </PluginComponent>
        </div>
      </Draggable>
    </Droppable>
  );
};

export default React.memo(Inner);
