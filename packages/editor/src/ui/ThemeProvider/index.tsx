import React from 'react';

import type { Theme } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import {
  ThemeProvider as MaterialUiThemeProvider,
  StylesProvider,
} from '@material-ui/styles';
import { createGenerateClassName } from '@material-ui/styles';
import darkTheme from './DarkTheme/index';
import { themeOptions } from './themeOptions';
export { darkTheme };

const generateClassName = createGenerateClassName({
  disableGlobal: true,
  seed: 'reactPage',
  productionPrefix: 'reactPage',
});
const theme = createTheme(themeOptions);

export type ThemeProviderProps = {
  theme?: Theme;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  return (
    <StylesProvider injectFirst={true} generateClassName={generateClassName}>
      <MaterialUiThemeProvider theme={props.theme || theme}>
        {props.children}
      </MaterialUiThemeProvider>
    </StylesProvider>
  );
};
