import React from 'react';
import AutoformControls from '../../../../ui/AutoformControls';
import BottomToolbar from '../../../../ui/BottomToolbar';
import { CellPluginComponentProps } from '../../../types';
import {
  useCellPlugin,
  useDebouncedCellData,
  useIsEditMode,
  useIsFocused,
  useIsPreviewMode,
  useLang,
  useRemoveCell,
} from '../../hooks';
import PluginMissing from '../PluginMissing';

const DefaultProvider: React.FC = ({ children }) => <>{children}</>;
const PluginComponent: React.FC<{ nodeId: string }> = ({
  nodeId,
  children,
}) => {
  const lang = useLang();
  const isPreviewMode = useIsPreviewMode();
  const isEditMode = useIsEditMode();

  const [data, onChange] = useDebouncedCellData(nodeId);

  const plugin = useCellPlugin(nodeId);
  const focused = useIsFocused(nodeId);

  const Component = plugin?.Renderer ?? PluginMissing;
  const Provider = plugin.Provider ?? DefaultProvider;
  const remove = useRemoveCell(nodeId);

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

  let controlsElement = null;
  if (plugin?.controls?.type === 'custom') {
    const { Component } = plugin.controls;
    controlsElement = <Component {...componentProps} />;
  }
  if (plugin?.controls?.type === 'autoform') {
    controlsElement = (
      <AutoformControls {...componentProps} {...plugin.controls} />
    );
  }

  return (
    <Provider {...componentProps}>
      <>
        <Component {...componentProps}>{children}</Component>
        <BottomToolbar
          nodeId={nodeId}
          open={focused && isEditMode}
          dark={plugin.controls?.dark}
        >
          <div
            style={{ marginBottom: 24, maxHeight: '50vh', overflow: 'auto' }}
          >
            {controlsElement}
          </div>
        </BottomToolbar>
      </>
    </Provider>
  );
};

export default PluginComponent;
