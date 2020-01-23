import { BottomToolbar } from '@react-page/ui';
import React from 'react';
import { SlateProps } from '../types/component';
import PluginButton from './PluginButton';

const Toolbar = (
  props: Pick<
    SlateProps,
    'id' | 'editable' | 'translations' | 'plugins' | 'name'
  > & {
    show: boolean;
    removeSlate: () => void;
  }
) => {
  const { show, removeSlate, plugins, translations } = props;
  const bottomToolbarProps = {
    open: show,
    dark: true,
    onDelete: removeSlate,
    editable: props.editable,
    name: props.name,
    id: props.id,
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
