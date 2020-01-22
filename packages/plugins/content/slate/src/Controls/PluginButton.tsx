import React, { useCallback, useRef, useState } from 'react';
import { Range, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import useAddPlugin from '../hooks/useAddPlugin';
import { getCurrentNodeDataWithPlugin } from '../hooks/useCurrentNodeDataWithPlugin';
import usePluginIsActive from '../hooks/usePluginIsActive';
import usePluginIsDisabled from '../hooks/usePluginIsDisabled';
import useRemovePlugin from '../hooks/useRemovePlugin';
import UniformsControls from '../pluginFactories/components/UniformsControls';
import {
  PluginButtonProps,
  SlatePluginDefinition
} from '../types/slatePluginDefinitions';
import ToolbarButton from './ToolbarButton';

type Props<T extends {}> = {
  plugin: SlatePluginDefinition<T>;
} & PluginButtonProps;

function PluginButton<T>(props: Props<T>) {
  const { plugin } = props;
  const hasControls = Boolean(plugin.Controls) || Boolean(plugin.schema);

  const [showControls, setShowControls] = useState(false);
  const selectionRef = useRef<{
    selection: Range;
    isActive: boolean;
    data: T;
  }>();

  const close = useCallback(() => setShowControls(false), []);
  const isActive = usePluginIsActive(plugin);
  const add = useAddPlugin(plugin);
  const remove = useRemovePlugin(plugin);
  const onClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      if (hasControls) {
        if (!showControls) {
          // store props
          selectionRef.current = {
            selection: editor.selection,
            isActive,
            data: getCurrentNodeDataWithPlugin(editor, plugin),
          };
        }
        setShowControls(!showControls);
      } else {
        if (isActive) {
          remove();
        } else {
          add();
        }
      }
    },
    [isActive, hasControls, showControls]
  );

  const { Controls: PassedControls } = plugin;
  const Controls = PassedControls || UniformsControls;
  const isDisabled = usePluginIsDisabled(plugin);

  const editor = useSlate();

  return (
    <>
      <ToolbarButton
        onClick={onClick}
        disabled={isDisabled}
        isActive={isActive}
        icon={
          plugin.icon ||
          (plugin.pluginType === 'component' && plugin.deserialize.tagName)
        }
      />

      {hasControls ? (
        <Controls
          schema={plugin.schema}
          close={close}
          open={showControls}
          add={p => {
            if (selectionRef?.current?.selection) {
              // restore selection before adding
              Transforms.select(editor, selectionRef?.current.selection);
            }
            add(p);
          }}
          remove={() => {
            if (selectionRef?.current?.selection) {
              // restore selection before adding
              Transforms.select(editor, selectionRef?.current.selection);
            }
            remove();
          }}
          isActive={selectionRef?.current?.isActive}
          shouldInsertWithText={
            plugin.pluginType === 'component' &&
            !selectionRef?.current?.selection &&
            !selectionRef?.current?.isActive
          }
          data={selectionRef?.current?.data}
          {...props}
        />
      ) : null}
    </>
  );
}

export default React.memo(PluginButton);
