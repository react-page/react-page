import { Avatar, Grid, Typography } from '@mui/material';
import React from 'react';
import {
  useFocusCell,
  useOption,
  usePluginOfCell,
  useUiTranslator,
} from '../../core/components/hooks';
import MoveActions from './MoveActions';
import { BottomToolbarTools } from './Tools';

export type BottomToolbarMainBarProps = {
  nodeId: string;
  actionsLeft?: React.ReactNode;
};
export const BottomToolbarMainBar: React.FC<BottomToolbarMainBarProps> =
  React.memo(({ nodeId, actionsLeft }) => {
    const { title, icon } = usePluginOfCell(nodeId) ?? {};
    const { t } = useUiTranslator();
    const focus = useFocusCell(nodeId);
    const showMoveButtons = useOption('showMoveButtonsInBottomToolbar');
    return (
      <div>
        <Grid container={true} direction="row" alignItems="center">
          {icon || title ? (
            <Grid item={true}>
              <Avatar
                onClick={() => focus(true)}
                children={icon || (title ? title[0] : '')}
                style={{
                  cursor: 'pointer',
                  marginRight: 16,
                }}
              />
            </Grid>
          ) : null}
          <Grid item={true}>
            <Typography variant="subtitle1">{t(title)}</Typography>
          </Grid>
          {actionsLeft &&
            React.Children.map(actionsLeft, (action, index) => (
              <Grid item={true} key={index}>
                {action}
              </Grid>
            ))}
          {showMoveButtons ? (
            <Grid item={true} style={{ marginLeft: 'auto' }}>
              <MoveActions nodeId={nodeId} />
            </Grid>
          ) : null}

          <Grid item={true} style={{ marginLeft: 'auto' }}>
            <BottomToolbarTools nodeId={nodeId} />
          </Grid>
        </Grid>
      </div>
    );
  });
