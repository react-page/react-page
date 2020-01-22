import React, { useCallback, useState } from 'react';
import { Range, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import useAddPlugin from '../hooks/useAddPlugin';
import { getCurrentNodeDataWithPlugin } from '../hooks/useCurrentNodeDataWithPlugin';
import useCurrentSelection from '../hooks/useCurrentSelection';
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

  const selection = useCurrentSelection();
  const [storedProps, setStoredProps] = useState<{
    selection: Range;
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
          setStoredProps({
            selection,
            data: getCurrentNodeDataWithPlugin(editor, plugin),
          });
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
    [isActive, hasControls, showControls, selection]
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

      {hasControls && showControls ? (
        <Controls
          schema={plugin.schema}
          close={close}
          open={showControls}
          add={p => {
            console.log('add', { selection: storedProps?.selection });
            if (storedProps?.selection) {
              // restore selection before adding
              Transforms.select(editor, storedProps.selection);
            }
            add(p);
          }}
          remove={remove}
          isActive={isActive}
          shouldInsertWithText={
            plugin.pluginType === 'component' &&
            !storedProps?.selection &&
            !isActive
          }
          data={storedProps?.data}
          {...props}
        />
      ) : null}
    </>
  );
}

export default React.memo(PluginButton);
