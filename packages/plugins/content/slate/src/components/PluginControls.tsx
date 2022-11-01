/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DataTType, JsonSchema } from '@react-page/editor';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { BaseRange } from 'slate';
import { Range, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import useAddPlugin from '../hooks/useAddPlugin';
import { getCurrentNodeDataWithPlugin } from '../hooks/useCurrentNodeDataWithPlugin';
import usePluginIsActive from '../hooks/usePluginIsActive';
import useRemovePlugin from '../hooks/useRemovePlugin';
import UniformsControls from '../pluginFactories/components/UniformsControls';

import type {
  PluginButtonProps,
  SlatePluginControls,
  SlatePluginDefinition,
} from '../types/slatePluginDefinitions';
import { useSetDialogIsVisible } from './DialogVisibleProvider';

type Props = {
  plugin: SlatePluginDefinition;
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
    data: DataTType;
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
    setIsVisible?.(props.open);
    _setOpen(props.open);
    if (props.open) {
      // we need to store the current state, when the dialog will open (but before it actually does)
      // this is also why we have a "delayed" _setOpen
      storedPropsRef.current = {
        selection: editor.selection as BaseRange,
        isActive,
        data: getCurrentNodeDataWithPlugin(editor, plugin),
      };
    }
    return () => {
      setIsVisible?.(false);
    };
  }, [props.open, setIsVisible, _setOpen]);

  const { controls } = plugin;
  const Controls = useMemo(() => {
    return controls
      ? controls.type === 'autoform'
        ? (props: SlatePluginControls<any>) => (
            <UniformsControls
              {...props}
              schema={controls?.schema as JsonSchema<any>}
            />
          )
        : controls.Component
      : UniformsControls;
  }, [controls]);

  const add = useCallback(
    (p: any) => {
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
      add={add}
      remove={remove}
      isActive={storedPropsRef?.current?.isActive ?? false}
      shouldInsertWithText={shouldInsertWithText}
      data={storedPropsRef?.current?.data}
      {...props}
    />
  ) : null;
}

export default React.memo(PluginControls);
