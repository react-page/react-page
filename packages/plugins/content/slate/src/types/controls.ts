import { SlateProps } from './component';
import { SlateApi } from './api';
import { SlateRendererExtraProps } from './renderer';

export type SlateControlsProps = SlateProps &
  SlateApi &
  SlateRendererExtraProps;
