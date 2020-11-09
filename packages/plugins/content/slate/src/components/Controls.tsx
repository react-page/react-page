import React from 'react';
import { SlateProps } from '../types/component';
import PluginButton from './PluginButton';

const Controls = (props: Pick<SlateProps, 'translations' | 'plugins'>) => {
  const { plugins, translations } = props;

  return (
    <div>
      {plugins &&
        plugins.map((plugin, i: number) =>
          plugin.addToolbarButton ? (
            <PluginButton key={i} translations={translations} plugin={plugin} />
          ) : null
        )}
    </div>
  );
};

export default React.memo(Controls);
