import { Avatar, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { usePluginOfCell, useUiTranslator } from '../../core/components/hooks';
import { BottomToolbarTools } from './Tools';

export type BottomToolbarMainBarProps = {
  nodeId: string;
  actionsLeft: React.ReactNode;
};
export const BottomToolbarMainBar: React.FC<BottomToolbarMainBarProps> = React.memo(
  ({ nodeId, actionsLeft }) => {
    const { title, icon } = usePluginOfCell(nodeId) ?? {};
    const { t } = useUiTranslator();
    return (
      <div>
        <Grid container={true} direction="row" alignItems="center">
          {icon || title ? (
            <Grid item={true}>
              <Avatar
                children={icon || (title ? title[0] : '')}
                style={{
                  marginRight: 16,
                }}
              />
            </Grid>
          ) : null}
          <Grid item={true}>
            <Typography variant="subtitle1">{t(title)}</Typography>
          </Grid>
          {React.Children.map(actionsLeft, (action, index) => (
            <Grid item={true} key={index}>
              {action}
            </Grid>
          ))}

          <Grid item={true} style={{ marginLeft: 'auto' }}>
            <BottomToolbarTools nodeId={nodeId} />
          </Grid>
        </Grid>
      </div>
    );
  }
);
