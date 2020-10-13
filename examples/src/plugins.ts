import { Plugins } from '@react-page/core';
// The background plugin
import background, { ModeEnum } from '@react-page/plugins-background';
import '@react-page/plugins-background/lib/index.css';

// The divider plugin
import divider from '@react-page/plugins-divider';
// The html5-video plugin
import html5video from '@react-page/plugins-html5-video';
import '@react-page/plugins-html5-video/lib/index.css';
// The image plugin
import { imagePlugin, ImageUploadType } from '@react-page/plugins-image';
import '@react-page/plugins-image/lib/index.css';
// The spacer plugin
import spacer from '@react-page/plugins-spacer';
import '@react-page/plugins-spacer/lib/index.css';
// The video plugin
import video from '@react-page/plugins-video';
import '@react-page/plugins-video/lib/index.css';

import customContentPlugin from './customContentPlugin';
import customContentPluginWithListField from './customContentPluginWithListField';
import customLayoutPlugin from './customLayoutPlugin';
import customLayoutPluginWithInitialState from './customLayoutPluginWithInitialState';
import { defaultSlate, customizedSlate } from './slate';
import customContentPluginTwitter from './customContentPluginTwitter';
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

export const plugins: Plugins = [
  defaultSlate,
  customizedSlate,
  spacer,
  imagePlugin({ imageUpload: fakeImageUploadService('/images/react.png') }),
  video,
  divider,
  html5video,
  customContentPlugin(),
  customContentPluginWithListField(),
  customContentPluginTwitter(),

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
];
