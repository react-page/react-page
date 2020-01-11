import { BottomToolbar } from '@react-page/ui';
import React from 'react';
import { SlateProps } from '../types/component';
import PluginButton from './PluginButton';

const Toolbar = ({
  show,
  removeSlate,
  plugins,
  translations,
  ...props
}: SlateProps & {
  show: boolean;
  removeSlate: () => void;
}) => (
  <BottomToolbar open={show} dark={true} onDelete={removeSlate} {...props}>
    <div>
      {plugins &&
        plugins.map((plugin, i: number) =>
          plugin.addToolbarButton ? (
            <PluginButton key={i} translations={translations} plugin={plugin} />
          ) : null
        )}
    </div>
  </BottomToolbar>
);

export default Toolbar;
