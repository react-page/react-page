import { BackgroundProps } from './component';
import { BackgroundApi } from './api';
import { BackgroundRendererExtraProps } from './renderer';

export type BackgroundControlsProps = BackgroundProps &
  BackgroundApi &
  BackgroundRendererExtraProps;
