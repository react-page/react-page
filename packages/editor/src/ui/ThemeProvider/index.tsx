import * as React from 'react';

import { createMuiTheme, Theme } from '@material-ui/core/styles';
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
  productionPrefix: 'reactPage',
});
const theme = createMuiTheme(themeOptions);

export interface ThemeProviderProps {
  theme?: Theme;
}

class ThemeProvider extends React.Component<ThemeProviderProps> {
  render() {
    return (
      <StylesProvider injectFirst={true} generateClassName={generateClassName}>
        <MaterialUiThemeProvider theme={this.props.theme || theme}>
          {this.props.children}
        </MaterialUiThemeProvider>
      </StylesProvider>
    );
  }
}

export default ThemeProvider;
