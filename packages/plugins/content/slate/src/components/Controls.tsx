import React from 'react';
import type { SlateProps } from '../types/component';
import PluginButton from './PluginButton';
import { useTheme } from '@mui/material';
const Controls = (props: Pick<SlateProps, 'translations' | 'plugins'>) => {
  const { plugins, translations } = props;
  const theme = useTheme();

  const dark = theme.palette.mode === 'dark';

  return (
    <div>
      {plugins &&
        plugins.map((plugin, i: number) =>
          plugin.addToolbarButton ? (
            <PluginButton
              key={i}
              translations={translations}
              plugin={plugin}
              dark={dark}
            />
          ) : null
        )}
    </div>
  );
};

export default React.memo(Controls);
