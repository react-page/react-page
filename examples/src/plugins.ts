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

import { Plugins } from '@react-page/core';
// The background plugin
import background, { ModeEnum } from '@react-page/plugins-background';
import '@react-page/plugins-background/lib/index.css';
// The native handler plugin
import native from '@react-page/plugins-default-native';
// The divider plugin
import divider from '@react-page/plugins-divider';
// The html5-video plugin
import html5video from '@react-page/plugins-html5-video';
import '@react-page/plugins-html5-video/lib/index.css';
// The image plugin
import { imagePlugin } from '@react-page/plugins-image';
import '@react-page/plugins-image/lib/index.css';
// The spacer plugin
import spacer from '@react-page/plugins-spacer';
import '@react-page/plugins-spacer/lib/index.css';
// The video plugin
import video from '@react-page/plugins-video';
import '@react-page/plugins-video/lib/index.css';
import { ImageUploadType } from '@react-page/ui/lib/ImageUpload/types';
import customContentPlugin from './customContentPlugin';
import customContentPluginWithListField from './customContentPluginWithListField';
import customLayoutPlugin from './customLayoutPlugin';
import customLayoutPluginWithInitialState from './customLayoutPluginWithInitialState';
import { defaultSlate, customizedSlate } from './slate';

const fakeImageUploadService: (url: string) => ImageUploadType = (
  defaultUrl
) => (file, reportProgress) => {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      reportProgress(counter * 10);
      if (counter > 9) {
        clearInterval(interval);
        alert(
          'This is a fake image upload service, please provide actual implementation via plugin properties'
        );
        resolve({ url: defaultUrl });
      }
    }, 500);
  });
};

// Define which plugins we want to use.

export const plugins: Plugins = {
  content: [
    defaultSlate,
    customizedSlate,
    spacer,
    imagePlugin({ imageUpload: fakeImageUploadService('/images/react.png') }),
    video,
    divider,
    html5video,
    customContentPlugin(),
    customContentPluginWithListField(),
  ],
  layout: [
    background({
      defaultPlugin: defaultSlate,
      imageUpload: fakeImageUploadService('/images/sea-bg.jpg'),
      enabledModes:
        ModeEnum.COLOR_MODE_FLAG |
        ModeEnum.IMAGE_MODE_FLAG |
        ModeEnum.GRADIENT_MODE_FLAG,
    }),
    customLayoutPlugin(),
    customLayoutPluginWithInitialState(),
  ],

  // If you pass the native key the editor will be able to handle native drag and drop events (such as links, text, etc).
  // The native plugin will then be responsible to properly display the data which was dropped onto the editor.
  native,
};
