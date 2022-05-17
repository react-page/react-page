import type { Theme } from '@material-ui/core';
import { Tab, Tabs } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React, { useState } from 'react';

import { AutoformControls } from '../../../../ui';
import type {
  CellPluginComponentProps,
  ControlsDef,
  ControlsDefList,
  DataTType,
} from '../../../types';

const StyledTab = withStyles(() => ({
  wrapper: {
    alignItems: 'flex-start',
  },
}))(Tab);

const StyledTabs = withStyles((theme: Theme) => ({
  root: {
    marginTop: -12,
    marginBottom: -12,
    marginLeft: -24,
    alignItems: 'flex-start',
    backgroundColor: theme.palette.background.default,
  },
}))(Tabs);
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
      <StyledTabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        orientation="vertical"
        variant="scrollable"
      >
        {controls.map((t, index) => (
          <StyledTab label={t.title} key={index} />
        ))}
      </StyledTabs>

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
