import React, { useCallback, useEffect, useState } from 'react';
import { Range, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import useAddPlugin from '../hooks/useAddPlugin';
import useCurrentNodeDataWithPlugin from '../hooks/useCurrentNodeDataWithPlugin';
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
  config: SlatePluginDefinition<T>;
  isActive: boolean;
} & PluginButtonProps;

function PluginButton<T>(props: Props<T>) {
  const { config } = props;
  const hasControls = Boolean(config.Controls) || Boolean(config.schema);

  const [showControls, setShowControls] = useState(false);

  const data = useCurrentNodeDataWithPlugin(config);
  const selection = useCurrentSelection();
  const [storedSelection, setStoredSelection] = useState<Range>();
  const close = useCallback(() => setShowControls(false), []);
  const isActive = usePluginIsActive(config);
  const add = useAddPlugin(config);
  const remove = useRemovePlugin(config);
  const onClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();

      if (hasControls) {
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
  useEffect(
    () => {
      if (showControls) {
        setStoredSelection(selection);
      } else {
        setStoredSelection(null);
      }
    },
    [showControls]
  );
  const { Controls: PassedControls } = config;
  const Controls = PassedControls || UniformsControls;
  const isDisabled = usePluginIsDisabled(config);

  const editor = useSlate();

  return (
    <>
      <ToolbarButton
        onClick={onClick}
        disabled={isDisabled}
        isActive={isActive}
        icon={
          config.icon ||
          (config.pluginType === 'component' && config.deserialize.tagName)
        }
      />

      {hasControls ? (
        <Controls
          schema={config.schema}
          close={close}
          open={showControls}
          add={p => {
            if (storedSelection) {
              // restore selection before adding
              Transforms.select(editor, storedSelection);
            }
            add(p);
          }}
          remove={remove}
          isActive={isActive}
          shouldInsertWithText={
            config.pluginType === 'component' && !storedSelection && !isActive
          }
          data={data}
          {...props}
        />
      ) : null}
    </>
  );
}

export default PluginButton;
