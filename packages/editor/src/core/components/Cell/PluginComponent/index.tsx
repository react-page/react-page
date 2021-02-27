import React from 'react';
import { BottomToolbar, AutoformControls } from '../../../../ui';
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
} from '../../hooks';
import PluginMissing from '../PluginMissing';

const DefaultProvider: React.FC = ({ children }) => <>{children}</>;
const PluginComponent: React.FC<{ nodeId: string; hasChildren: boolean }> = ({
  nodeId,
  children,
  hasChildren,
}) => {
  const lang = useLang();
  const isPreviewMode = useIsPreviewMode();
  const isEditMode = useIsEditMode();

  const [data, onChange] = useDebouncedCellData(nodeId);

  const plugin = usePluginOfCell(nodeId);
  const focused = useIsFocused(nodeId);

  const Component = plugin?.Renderer ?? PluginMissing;
  const Provider = plugin?.Provider ?? DefaultProvider;
  const remove = useRemoveCell(nodeId);

  const Toolbar = useOptions().components?.BottomToolbar ?? BottomToolbar;

  const componentProps: CellPluginComponentProps<unknown> = {
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
  };

  let pluginControls = null;
  if (plugin?.controls?.type === 'custom') {
    const { Component } = plugin.controls;
    pluginControls = <Component {...componentProps} />;
  }
  if (plugin?.controls?.type === 'autoform') {
    pluginControls = (
      <AutoformControls {...componentProps} {...plugin.controls} />
    );
  }
  return (
    <Provider {...componentProps}>
      <>
        <div
          style={{
            height: '100%',
            pointerEvents:
              !isPreviewMode && !plugin?.allowClickInside && !hasChildren
                ? 'none'
                : undefined,
          }}
        >
          <Component {...componentProps}>{children}</Component>
        </div>
        <Toolbar
          nodeId={nodeId}
          open={focused && isEditMode}
          dark={plugin?.controls?.dark}
          pluginControls={
            <div
              style={{ marginBottom: 12, maxHeight: '50vh', overflow: 'auto' }}
            >
              {pluginControls}
            </div>
          }
        />
      </>
    </Provider>
  );
};

export default PluginComponent;
