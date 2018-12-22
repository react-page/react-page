/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

import * as React from 'react';
import { v4 } from 'uuid';
import Icon from '@material-ui/icons/CropLandscape';
import TextField from '@material-ui/core/TextField';
import {
  LayoutPluginProps,
  LayoutPluginConfig
} from 'ory-editor-core/lib/service/plugin/classes';
import { BottomToolbar } from 'ory-editor-ui';
import ThemeProvider, { darkTheme } from 'ory-editor-ui/lib/ThemeProvider';
import { ContentPluginConfig } from 'ory-editor-core/lib/service/plugin/classes';

if (process.env.NODE_ENV !== 'production') {
  console.warn(
    // tslint:disable-next-line:max-line-length
    'WARNING! Obsolete plugin loaded. \'ory/editor/core/layout/parallax-background\' has been deprecated, please use the new \'ory/editor/core/layout/background\' plugin instead!'
  );
}

export interface BackgroundState {
  background?: string;
  darken?: number | string;
}

class PluginComponent extends React.Component<
  LayoutPluginProps<BackgroundState>
> {
  handleChangeBackground: React.ChangeEventHandler<HTMLInputElement> = e =>
    this.props.onChange({ background: e.target.value })

  handleChangeDarken: React.ChangeEventHandler<HTMLInputElement> = e =>
    this.props.onChange({ darken: e.target.value })

  render() {
    const {
      children,
      focused,
      state: { background = '', darken = 0.3 },
    } = this.props;
    return (
      <ThemeProvider theme={darkTheme}>
        <div
          className="ory-plugins-layout-parallax-background"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, ${darken}), rgba(0, 0, 0, ${darken})), url('${background}')`,
          }}
        >
          <BottomToolbar open={focused} theme={darkTheme}>
            <TextField
              placeholder="http://example.com/image.png"
              label="Image location (URL)"
              style={{ width: '256px' }}
              value={background}
              onChange={this.handleChangeBackground}
            />
            <TextField
              placeholder="0.3"
              label="Darken level"
              style={{ width: '256px' }}
              value={darken}
              onChange={this.handleChangeDarken}
            />
          </BottomToolbar>
          {children}
        </div>
      </ThemeProvider>
    );
  }
}

export interface ParallaxBackgroundPluginSettings {
  defaultPlugin: ContentPluginConfig;
}

export default ({
  defaultPlugin,
}: ParallaxBackgroundPluginSettings): LayoutPluginConfig<BackgroundState> => ({
  Component: PluginComponent,
  name: 'ory/editor/core/layout/parallax-background',
  version: '0.0.1',

  text: 'Parallax Background (deprecated)',
  IconComponent: <Icon />,

  createInitialChildren: () => ({
    id: v4(),
    rows: [
      {
        id: v4(),
        cells: [
          {
            content: {
              plugin: defaultPlugin,
              state: defaultPlugin.createInitialState(),
            },
            id: v4(),
          },
        ],
      },
    ],
  }),

  handleFocusNextHotKey: () => Promise.reject(),
  handleFocusPreviousHotKey: () => Promise.reject(),
});
