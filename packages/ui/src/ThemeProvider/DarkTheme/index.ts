import { createMuiTheme } from '@material-ui/core/styles';
import { themeOptions } from '../themeOptions';

const theme = createMuiTheme({
  ...themeOptions,
  palette: {
    ...(themeOptions && themeOptions.palette),
    type: 'dark',
  },
});

export default theme;
