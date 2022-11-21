import type { CellPlugin } from '@react-page/editor';
import { ImageUploadType } from '@react-page/editor';
import type { ImageSettings } from './types/settings';
import type { ImageState } from './types/state';
declare const imagePlugin: (settings?: Partial<ImageSettings>) => CellPlugin<ImageState>;
declare const image: CellPlugin<ImageState, ImageState>;
export default image;
export { ImageUploadType };
export { imagePlugin };
//# sourceMappingURL=index.d.ts.map