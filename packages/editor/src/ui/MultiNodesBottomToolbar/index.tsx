import { Avatar, Grid, Typography } from '@material-ui/core';
import React from 'react';
import {
  useAllFocusedNodeIds,
  useUiTranslator,
} from '../../core/components/hooks';
import { BottomToolbarDrawer, BottomToolbarMainBar } from '../BottomToolbar';
import { ThemeProvider } from '../ThemeProvider';
import DeleteAll from './DeleteAll';

type MultiNodesBottomToolbarProps = {};
export const MultiNodesBottomToolbar: React.FC<MultiNodesBottomToolbarProps> = React.memo(
  () => {
    const { t } = useUiTranslator();
    const focusedNodeIds = useAllFocusedNodeIds();
    return (
      <ThemeProvider>
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
            <Grid item>
              <DeleteAll />
            </Grid>
          </Grid>
        </BottomToolbarDrawer>
      </ThemeProvider>
    );
  }
);
