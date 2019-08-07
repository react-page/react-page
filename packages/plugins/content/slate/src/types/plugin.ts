import { PluginGetComponent } from '../plugins/Plugin';

export interface SlatePluginSettings {
  // tslint:disable-next-line:no-any
  getComponent?: PluginGetComponent;
}
