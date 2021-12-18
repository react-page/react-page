import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Range, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import useAddPlugin from '../hooks/useAddPlugin';
import { getCurrentNodeDataWithPlugin } from '../hooks/useCurrentNodeDataWithPlugin';
import usePluginIsActive from '../hooks/usePluginIsActive';
import useRemovePlugin from '../hooks/useRemovePlugin';
import UniformsControls from '../pluginFactories/components/UniformsControls';

import type {
  PluginButtonProps,
  SlatePluginDefinition,
} from '../types/slatePluginDefinitions';
import { useSetDialogIsVisible } from './DialogVisibleProvider';

type Props = {
  plugin: SlatePluginDefinition<unknown>;
} & PluginButtonProps;

function PluginControls(
  props: Props & {
    open: boolean;
    close: () => void;
  }
) {
  const { plugin } = props;

  const storedPropsRef = useRef<{
    selection: Range;
    isActive: boolean;
    data: unknown;
  }>();

  const isVoid =
    plugin.pluginType === 'component' &&
    (plugin.object === 'inline' || plugin.object === 'block') &&
    plugin.isVoid;
  const shouldInsertWithText =
    !isVoid &&
    (!storedPropsRef?.current?.selection ||
      Range.isCollapsed(storedPropsRef?.current?.selection)) &&
    !storedPropsRef?.current?.isActive;

  const addPlugin = useAddPlugin(plugin);
  const removePlugin = useRemovePlugin(plugin);
  const editor = useSlate();
  const setIsVisible = useSetDialogIsVisible();
  const [_open, _setOpen] = useState(false);
  const isActive = usePluginIsActive(plugin);

  useEffect(() => {
    // this is to indicate that any dialog is visible
    setIsVisible(props.open);
    _setOpen(props.open);
    if (props.open) {
      // we need to store the current state, when the dialog will open (but before it actually does)
      // this is also why we have a "delayed" _setOpen
      storedPropsRef.current = {
        selection: editor.selection,
        isActive,
        data: getCurrentNodeDataWithPlugin(editor, plugin),
      };
    }
    return () => {
      setIsVisible(false);
    };
  }, [props.open, setIsVisible, _setOpen]);

  const { controls } = plugin;
  const Controls = controls
    ? controls.type === 'autoform'
      ? (props) => <UniformsControls {...props} schema={controls?.schema} />
      : controls.Component
    : UniformsControls;

  const add = useCallback(
    (p) => {
      if (storedPropsRef?.current?.selection) {
        // restore selection before adding
        Transforms.select(editor, storedPropsRef?.current?.selection);
      }
      addPlugin(p);
    },
    [addPlugin]
  );
  const remove = useCallback(() => {
    // see https://github.com/ianstormtaylor/slate/issues/4240
    setTimeout(() => {
      if (storedPropsRef?.current?.selection) {
        // restore selection before removing
        Transforms.select(editor, storedPropsRef?.current?.selection);
      }
      removePlugin();
    }, 100);
  }, [removePlugin]);

  return props.open ? (
    <Controls
      pluginConfig={plugin}
      close={close}
      open={true}
      add={add}
      remove={remove}
      isActive={storedPropsRef?.current?.isActive}
      shouldInsertWithText={shouldInsertWithText}
      data={storedPropsRef?.current?.data}
      {...props}
    />
  ) : null;
}

export default React.memo(PluginControls);
