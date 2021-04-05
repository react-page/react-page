import React, { useMemo } from 'react';
import { BottomToolbar } from '../../../../ui';
import { CellPluginComponentProps } from '../../../types';
import {
  usePluginOfCell,
  useDebouncedCellData,
  useIsEditMode,
  useIsFocused,
  useIsPreviewMode,
  useLang,
  useRemoveCell,
  useOptions,
  useCellProps,
} from '../../hooks';
import PluginControls from '../PluginControls';
import PluginMissing from '../PluginMissing';
import NoopProvider from '../NoopProvider';

const PluginComponent: React.FC<{ nodeId: string; hasChildren: boolean }> = ({
  nodeId,
  children,
  hasChildren,
}) => {
  const lang = useLang();
  const CustomPluginMissing = useOptions()?.components?.CellPluginMissing;
  const isPreviewMode = useIsPreviewMode();
  const isEditMode = useIsEditMode();

  const [data, onChange] = useDebouncedCellData(nodeId);
  const pluginId = useCellProps(nodeId, (c) => c.plugin?.id);
  const plugin = usePluginOfCell(nodeId);
  const focused = useIsFocused(nodeId);
  const hasInlineNeighbour = useCellProps(nodeId, (c) => c.hasInlineNeighbour);

  const Renderer = plugin?.Renderer;
  const Missing = CustomPluginMissing ?? PluginMissing;
  const Provider = plugin?.Provider ?? NoopProvider;
  const remove = useRemoveCell(nodeId);

  const Toolbar = useOptions().components?.BottomToolbar ?? BottomToolbar;

  const componentProps = useMemo<CellPluginComponentProps<unknown>>(
    () => ({
      nodeId,
      lang,
      data,
      pluginConfig: plugin,
      focused: isEditMode && focused,
      readOnly: !isEditMode,
      onChange: onChange,
      isEditMode,
      isPreviewMode,
      remove,
    }),
    [
      nodeId,
      lang,
      data,
      plugin,
      isEditMode,
      focused,
      onChange,
      isEditMode,
      isPreviewMode,
      remove,
    ]
  );

  // In case of non-zero cell spacing, nested layouts (layout plugins with children) should have their
  // margin collapsing functionality off. The simplest solution is to use display:flex for the below wrapping <div>.
  // This however is not compatible with inline elements flotation, so if a cell has inline neighbors, we are going
  // to have to keep display:block style. Layout plugins with inline cell support will have to take care of
  // margin collapsing internally on their own.
  const display = hasInlineNeighbour
    ? {}
    : {
        display: 'flex' as const,
        flexDirection: 'column' as const,
      };

  return (
    <Provider {...componentProps}>
      <>
        <div
          style={{
            ...display,
            height: '100%',
            pointerEvents:
              !isPreviewMode && !plugin?.allowClickInside && !hasChildren
                ? 'none'
                : undefined,
          }}
        >
          {Renderer ? (
            <Renderer {...componentProps}>{children}</Renderer>
          ) : pluginId ? (
            <Missing {...componentProps} pluginId={pluginId} />
          ) : (
            children
          )}
        </div>
        <Toolbar
          nodeId={nodeId}
          open={focused && isEditMode}
          dark={plugin?.bottomToolbar?.dark}
          pluginControls={
            plugin?.controls ? (
              <PluginControls
                componentProps={componentProps}
                controls={plugin?.controls}
              />
            ) : null
          }
        />
      </>
    </Provider>
  );
};

export default PluginComponent;
