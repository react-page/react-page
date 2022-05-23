import { Avatar, Grid, Typography } from '@mui/material';
import React from 'react';
import {
  useAllFocusedNodeIds,
  useUiTranslator,
} from '../../core/components/hooks';
import { BottomToolbarDrawer } from '../BottomToolbar';
import DeleteAll from './DeleteAll';
import DuplicateAll from './DuplicateAll';

export const MultiNodesBottomToolbar: React.FC = React.memo(() => {
  const { t } = useUiTranslator();
  const focusedNodeIds = useAllFocusedNodeIds();
  return (
    <BottomToolbarDrawer open={focusedNodeIds.length > 1} anchor={'bottom'}>
      <Grid container={true} direction="row" alignItems="center">
        <Grid item={true}>
          <Avatar
            children={focusedNodeIds.length}
            style={{
              marginRight: 16,
            }}
          />
        </Grid>

        <Grid item={true}>
          <Typography variant="subtitle1">
            {t('(multiple selected)')}
          </Typography>
        </Grid>
        <Grid item style={{ marginLeft: 'auto' }}>
          <DuplicateAll />
        </Grid>
        <Grid item>
          <DeleteAll />
        </Grid>
      </Grid>
    </BottomToolbarDrawer>
  );
});
