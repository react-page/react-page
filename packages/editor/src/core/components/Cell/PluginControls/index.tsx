import { Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';

import { AutoformControls } from '../../../../ui';
import type {
  CellPluginComponentProps,
  ControlsDef,
  ControlsDefList,
  DataTType,
} from '../../../types';

const ControlsList: React.FC<{
  controls: ControlsDefList;
  componentProps: CellPluginComponentProps<DataTType>;
}> = React.memo(({ controls, componentProps }) => {
  const [tab, setTab] = useState(0);

  const activeControls = controls[tab]?.controls;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Tabs
        sx={{
          marginTop: '-12px',
          marginBottom: '-12px',
          marginLeft: '-24px',
          alignItems: 'flex-start',
          backgroundColor: (theme) => theme.palette.background.default,
        }}
        value={tab}
        onChange={(e, v) => setTab(v)}
        orientation="vertical"
        variant="scrollable"
      >
        {controls.map((t, index) => (
          <Tab
            sx={{
              alignItems: 'flex-start',
            }}
            label={t.title}
            key={index}
          />
        ))}
      </Tabs>

      {activeControls ? (
        <div
          style={{
            flex: 1,
            marginLeft: 24,
            display: 'flex',
          }}
        >
          <Controls controls={activeControls} componentProps={componentProps} />
        </div>
      ) : null}
    </div>
  );
});

const Controls: React.FC<{
  controls: ControlsDef;
  componentProps: CellPluginComponentProps;
}> = React.memo(({ controls, componentProps }) => {
  let pluginControls = null;
  if (Array.isArray(controls)) {
    return <ControlsList componentProps={componentProps} controls={controls} />;
  }

  if (controls?.type === 'custom') {
    const { Component } = controls;
    pluginControls = <Component {...componentProps} {...controls} />;
  } else if (controls?.type === 'autoform') {
    pluginControls = <AutoformControls {...componentProps} {...controls} />;
  }
  return <div style={{ overflow: 'auto', flex: 1 }}>{pluginControls}</div>;
});

const PluginControls: React.FC<{
  controls: ControlsDef;
  componentProps: CellPluginComponentProps;
}> = ({ controls, componentProps }) => {
  return (
    <div
      style={{
        maxHeight: '50vh',
        // if it has tabs, stretch to avoid jumping tabs
        width: Array.isArray(controls) ? '100vw' : undefined,
        maxWidth: '100%',
        display: 'flex',
      }}
    >
      <Controls controls={controls} componentProps={componentProps} />
    </div>
  );
};

export default React.memo(PluginControls);
