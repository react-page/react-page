import { VideoProps } from './component';
export interface VideoHtmlRendererExtraProps {}

export type VideoHtmlRendererProps = VideoProps &
  VideoHtmlRendererExtraProps;
