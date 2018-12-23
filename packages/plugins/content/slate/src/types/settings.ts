import Plugin from '../plugins/Plugin';
import { PluginButtonProps } from './../plugins/Plugin';

export interface SlateSettings {
  plugins?: Plugin[];
  HoverButtons?: React.SFC<PluginButtonProps>;
  ToolbarButtons?: React.SFC<PluginButtonProps>;
}
