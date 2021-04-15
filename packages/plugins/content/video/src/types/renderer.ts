import type { VideoProps } from './component';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VideoHtmlRendererExtraProps {}

export type VideoHtmlRendererProps = VideoProps & VideoHtmlRendererExtraProps;
