import lazyLoad from '../../core/helper/lazyLoad';

export * from './types';

export const ImageUpload = lazyLoad(() => import('./ImageUpload'));
