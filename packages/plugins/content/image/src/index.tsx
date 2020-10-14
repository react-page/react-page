import { PluginBase, lazyLoad } from '@react-page/core';
import createPlugin from './createPlugin';
import ImageHtmlRenderer from './Renderer/ImageHtmlRenderer';
import { ImageSettings } from './types/settings';
import { ImageState } from './types/state';
import { ImageUploadType } from '@react-page/ui';
const ImageDefaultControls = lazyLoad(() =>
  import('./Controls/ImageDefaultControls')
);

const imagePlugin: (
  settings?: Partial<ImageSettings>
) => PluginBase<ImageState> = (settings) =>
  createPlugin({
    Renderer: ImageHtmlRenderer,
    Controls: ImageDefaultControls,
    ...settings,
  });

const image = imagePlugin();
export default image;
export { ImageUploadType };
export { imagePlugin };
