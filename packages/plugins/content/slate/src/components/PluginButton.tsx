import { useUiTranslator } from '@react-page/editor';
import React, { useCallback, useState } from 'react';
import { Range } from 'slate';
import { useSlate } from 'slate-react';
import useAddPlugin from '../hooks/useAddPlugin';
import usePluginIsActive from '../hooks/usePluginIsActive';
import usePluginIsDisabled from '../hooks/usePluginIsDisabled';
import useRemovePlugin from '../hooks/useRemovePlugin';
import type {
  PluginButtonProps,
  SlatePluginDefinition,
} from '../types/slatePluginDefinitions';
import PluginControls from './PluginControls';
import ToolbarButton from './ToolbarButton';

type Props = {
  plugin: SlatePluginDefinition;
  dark?: boolean;
} & PluginButtonProps;

function PluginButton(props: Props) {
  const { plugin, dark } = props;
  const { t } = useUiTranslator();
  const hasControls = Boolean(plugin.controls);

  const [showControls, setShowControls] = useState(false);

  const editor = useSlate();

  const isActive = usePluginIsActive(plugin);
  const isVoid =
    plugin.pluginType === 'component' &&
    (plugin.object === 'inline' || plugin.object === 'block') &&
    plugin.isVoid;
  const shouldInsertWithText =
    plugin.pluginType === 'component' &&
    (plugin.object === 'inline' || plugin.object === 'mark') &&
    (!editor.selection || Range.isCollapsed(editor.selection)) &&
    !isActive &&
    !isVoid;

  const add = useAddPlugin(plugin);
  const remove = useRemovePlugin(plugin);
  const close = useCallback(() => setShowControls(false), [setShowControls]);
  const onClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      if (hasControls || shouldInsertWithText) {
        setShowControls(!showControls);
      } else {
        if (isActive) {
          remove();
        } else {
          add();
        }
      }
    },
    [isActive, hasControls, showControls, shouldInsertWithText]
  );

  const isDisabled = usePluginIsDisabled(plugin);

  return (
    <>
      <ToolbarButton
        onClick={onClick}
        disabled={isDisabled}
        isActive={isActive}
        dark={dark}
        icon={
          plugin.icon ??
          (plugin.pluginType === 'component'
            ? plugin.deserialize?.tagName ?? ''
            : '')
        }
        toolTip={t(plugin.label) ?? ''}
      />

      {(hasControls || shouldInsertWithText) && showControls ? (
        <PluginControls {...props} open={showControls} close={close} />
      ) : null}
    </>
  );
}

export default React.memo(PluginButton);
