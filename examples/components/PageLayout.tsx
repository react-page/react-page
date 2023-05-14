import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import type { FC, PropsWithChildren } from 'react';
import * as React from 'react';

const drawerWidth = 300;
const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginRight: 'auto',
          marginTop: '64px',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            p: 4,
            backgroundColor: 'white',
            maxWidth: 1280,
            marginLeft: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default PageLayout;
