import type { ThemeOptions } from '@mui/material';
import { createTheme } from '@mui/material';

export const defaultThemeOptions: ThemeOptions = {
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
  },
};

export const defaultTheme = createTheme(defaultThemeOptions);
