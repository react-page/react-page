import { List, ListItemButton, ListItemIcon } from '@mui/material';
import { Box } from '@mui/system';
import type { SxProps } from '@mui/system';
import React from 'react';
import {
  useFocusCell,
  useFocusedNodeId,
  usePluginOfCell,
} from '../../core/components/hooks';
import Drawer from '@mui/material/Drawer';
import { ListItem, ListItemText, Portal } from '@mui/material';
import { QuestionMark, ViewColumn } from '@mui/icons-material';
import type { ValueWithLegacy } from '../../core/types';

const NodeItem = ({
  node,
  nodeId,
  ListItemSxProps,
}: {
  node: any;
  nodeId: string;
  ListItemSxProps?: SxProps;
}) => {
  const focusedNodeId = useFocusedNodeId();
  const plugin = usePluginOfCell(nodeId);
  const focus = useFocusCell(nodeId);

  return (
    <ListItem disablePadding dense>
      <ListItemButton
        selected={focusedNodeId === nodeId}
        onClick={() => {
          focus(true);
        }}
        sx={ListItemSxProps}
      >
        <ListItemIcon
          sx={{
            minWidth: 'auto',
            mr: 1,
          }}
        >
          {plugin?.icon ? (
            plugin?.icon
          ) : node.rows.length > 0 ? (
            <ViewColumn />
          ) : (
            <QuestionMark />
          )}
        </ListItemIcon>
        <ListItemText primary={plugin?.title ?? 'Row'} />
      </ListItemButton>
    </ListItem>
  );
};

const drawerWidth = 300;

export const NodesNavigator = ({
  value,
  mobileOpen,
  handleDrawerToggle,
}: {
  value?: ValueWithLegacy | null | any;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}) => {
  const drawer = (
    <List>
      {value?.rows
        ?.flatMap(({ cells }: any) => cells)
        .map((cell: any) => {
          return (
            <React.Fragment key={cell.id}>
              <NodeItem node={cell} nodeId={cell.id} />
              {cell.rows.length > 0 && (
                <List sx={{ pt: 0 }}>
                  {cell.rows
                    ?.flatMap(({ cells }: any) => cells)
                    .map((cell: any) => {
                      return (
                        <NodeItem
                          key={cell.id}
                          nodeId={cell.id}
                          node={cell}
                          ListItemSxProps={{ ml: 6 }}
                        />
                      );
                    })}
                </List>
              )}
            </React.Fragment>
          );
        })}
    </List>
  );

  return (
    <Portal>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          position: 'relative',
        }}
        aria-label="mailbox folders"
        className="react-page-editor-nodes-navigator"
      >
        <Drawer // The implementation can be swapped with js to avoid SEO duplication of links.
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              zIndex: 10,
              boxSizing: 'border-box',
              width: drawerWidth,
              height: 'calc(100vh - 64px)',
              top: 64,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Portal>
  );
};
