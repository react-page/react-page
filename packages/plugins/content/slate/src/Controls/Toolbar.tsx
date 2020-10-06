import { BottomToolbar } from '@react-page/ui';
import React from 'react';
import { SlateProps } from '../types/component';
import PluginButton from './PluginButton';

const Toolbar = (
  props: Pick<SlateProps, 'nodeId' | 'translations' | 'plugins'> & {
    show: boolean;
    removeSlate: () => void;
  }
) => {
  const { show, removeSlate, plugins, translations, nodeId } = props;
  const bottomToolbarProps = {
    open: show,
    dark: true,
    onDelete: removeSlate,

    nodeId,
  };
  // useWhyDidYouUpdate('Toolbar' + props.id, props);
  return (
    <BottomToolbar {...bottomToolbarProps}>
      <div>
        {plugins &&
          plugins.map((plugin, i: number) =>
            plugin.addToolbarButton ? (
              <PluginButton
                key={i}
                translations={translations}
                plugin={plugin}
              />
            ) : null
          )}
      </div>
    </BottomToolbar>
  );
};

export default React.memo(Toolbar);
